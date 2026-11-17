(function () {
    "use strict";

    const STORAGE_KEY = "kb_github_settings";

    const els = {
        ghOwner: document.getElementById("ghOwner"),
        ghRepo: document.getElementById("ghRepo"),
        ghBranch: document.getElementById("ghBranch"),
        ghToken: document.getElementById("ghToken"),
        connectBtn: document.getElementById("connectBtn"),
        connectStatus: document.getElementById("connectStatus"),
        folderSelect: document.getElementById("folderSelect"),
        newFolder: document.getElementById("newFolder"),
        fileSlug: document.getElementById("fileSlug"),
        pathPreview: document.getElementById("pathPreview"),
        articleTitle: document.getElementById("articleTitle"),
        form: document.getElementById("articleForm"),
        publishBtn: document.getElementById("publishBtn"),
        publishStatus: document.getElementById("publishStatus"),
        resetBtn: document.getElementById("resetBtn"),
        publishedCard: document.getElementById("publishedCard"),
        publishedList: document.getElementById("publishedList"),
        noteEnabled: document.getElementById("noteEnabled"),
        noteText: document.getElementById("noteText"),
        modeCreate: document.getElementById("modeCreate"),
        modeEdit: document.getElementById("modeEdit"),
        editPicker: document.getElementById("editPicker"),
        articleSelect: document.getElementById("articleSelect"),
        loadStatus: document.getElementById("loadStatus"),
        destinationHint: document.getElementById("destinationHint"),
        modeIndicator: document.getElementById("modeIndicator"),
        previewBtn: document.getElementById("previewBtn"),
        previewOverlay: document.getElementById("previewOverlay"),
        previewFrame: document.getElementById("previewFrame"),
        previewClose: document.getElementById("previewClose"),
    };

    // path -> sha of the article currently loaded for editing (null when creating new)
    let currentEdit = null;

    const EXCLUDED_ARTICLE_PATHS = ["index.html", "create-article.html", "features/feature.html"];

    function currentMode() {
        return els.modeEdit.checked ? "edit" : "create";
    }

    function destinationFieldsDisabled(disabled) {
        [els.folderSelect, els.newFolder, els.fileSlug].forEach(function (el) {
            el.disabled = disabled;
        });
    }

    function refreshModeUi() {
        const mode = currentMode();
        els.editPicker.style.display = mode === "edit" ? "block" : "none";

        if (mode === "edit") {
            els.destinationHint.textContent = currentEdit
                ? "Editing the file loaded below. Path is locked to avoid accidentally forking it into a new file."
                : "Select an article above to load its content and path.";
            destinationFieldsDisabled(true);
            els.publishBtn.textContent = "Update on GitHub";
            els.modeIndicator.textContent = currentEdit ? "Updating: " + currentEdit.path : "No article loaded yet";
        } else {
            els.destinationHint.textContent = "Choose where in the repository this article should be created.";
            destinationFieldsDisabled(false);
            els.publishBtn.textContent = "Publish to GitHub";
            els.modeIndicator.textContent = "";
        }
    }

    els.modeCreate.addEventListener("change", refreshModeUi);
    els.modeEdit.addEventListener("change", refreshModeUi);
    refreshModeUi();

    // ---------- persisted GitHub connection settings (no token persisted by default beyond this session's localStorage) ----------

    function loadSettings() {
        try {
            const raw = localStorage.getItem(STORAGE_KEY);
            if (!raw) return;
            const s = JSON.parse(raw);
            els.ghOwner.value = s.owner || "";
            els.ghRepo.value = s.repo || "";
            els.ghBranch.value = s.branch || "main";
        } catch (e) {
            /* ignore corrupt storage */
        }
    }

    function saveSettings() {
        localStorage.setItem(STORAGE_KEY, JSON.stringify({
            owner: els.ghOwner.value.trim(),
            repo: els.ghRepo.value.trim(),
            branch: els.ghBranch.value.trim() || "main",
        }));
    }

    loadSettings();

    // ---------- repeatable field lists ----------

    const lists = {
        prereq: { container: document.getElementById("prereqList"), items: [] },
        step: { container: document.getElementById("stepsList"), items: [] },
        trouble: { container: document.getElementById("troubleList"), items: [] },
        related: { container: document.getElementById("relatedList"), items: [] },
        tag: { container: document.getElementById("tagsList"), items: [] },
    };

    function makeRepeatRow(kind, fieldsHtml) {
        const row = document.createElement("div");
        row.className = "caf-repeat-item";
        row.innerHTML =
            '<div class="caf-repeat-fields">' + fieldsHtml + "</div>" +
            '<button type="button" class="caf-icon-btn" title="Remove">✕</button>';
        row.querySelector(".caf-icon-btn").addEventListener("click", function () {
            row.remove();
        });
        lists[kind].container.appendChild(row);
        return row;
    }

    function addPrereq() {
        makeRepeatRow("prereq", '<input type="text" class="pr-text" placeholder="Site collection administrator or Apps365 admin role">');
    }

    function addStep() {
        makeRepeatRow("step",
            '<input type="text" class="st-title" placeholder="Open the Helpdesk 365 admin settings">' +
            '<textarea class="st-desc" placeholder="From the app home page, select the gear icon, then Admin settings → Automation & workflows."></textarea>');
    }

    function addTrouble() {
        makeRepeatRow("trouble", '<input type="text" class="tb-text" placeholder="Setting not visible: your role lacks the Manage configuration permission.">');
    }

    function addRelated() {
        makeRepeatRow("related",
            '<input type="text" class="rl-title" placeholder="Install Helpdesk 365 in Microsoft Teams">' +
            '<input type="text" class="rl-sub" placeholder="Helpdesk 365 · 6 min">');
    }

    function addTag() {
        makeRepeatRow("tag", '<input type="text" class="tg-text" placeholder="SLA">');
    }

    document.querySelectorAll("[data-add]").forEach(function (btn) {
        btn.addEventListener("click", function () {
            const kind = btn.getAttribute("data-add");
            if (kind === "prereq") addPrereq();
            else if (kind === "step") addStep();
            else if (kind === "trouble") addTrouble();
            else if (kind === "related") addRelated();
            else if (kind === "tag") addTag();
        });
    });

    // seed with one blank row each so the form isn't empty
    addPrereq();
    addStep();
    addStep();
    addTrouble();
    addTag();
    addTag();

    // ---------- slug / path preview ----------

    function slugify(text) {
        return text
            .toLowerCase()
            .trim()
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/^-+|-+$/g, "") || "untitled";
    }

    let slugManuallyEdited = false;
    els.fileSlug.addEventListener("input", function () {
        slugManuallyEdited = true;
        updatePathPreview();
    });
    els.articleTitle.addEventListener("input", function () {
        if (!slugManuallyEdited) {
            els.fileSlug.value = slugify(els.articleTitle.value);
        }
        updatePathPreview();
    });
    els.folderSelect.addEventListener("change", updatePathPreview);
    els.newFolder.addEventListener("input", updatePathPreview);

    function currentFolder() {
        const typed = els.newFolder.value.trim().replace(/^\/+|\/+$/g, "");
        if (typed) return typed;
        return els.folderSelect.value;
    }

    function currentFilePath() {
        const folder = currentFolder();
        const file = (slugify(els.fileSlug.value || els.articleTitle.value)) + ".html";
        return folder ? folder + "/" + file : file;
    }

    function updatePathPreview() {
        els.pathPreview.textContent = currentFilePath();
    }

    updatePathPreview();

    // ---------- GitHub connection ----------

    function ghHeaders(token) {
        return {
            "Accept": "application/vnd.github+json",
            "Authorization": "Bearer " + token,
        };
    }

    function setStatus(el, text, kind) {
        el.textContent = text;
        el.className = "caf-status" + (kind ? " " + kind : "");
    }

    els.connectBtn.addEventListener("click", async function () {
        const owner = els.ghOwner.value.trim();
        const repo = els.ghRepo.value.trim();
        const branch = els.ghBranch.value.trim() || "main";
        const token = els.ghToken.value.trim();

        if (!owner || !repo || !token) {
            setStatus(els.connectStatus, "Owner, repo and token are required.", "err");
            return;
        }

        saveSettings();
        setStatus(els.connectStatus, "Loading folders…", "pending");
        els.connectBtn.disabled = true;

        try {
            const branchRes = await fetch(
                "https://api.github.com/repos/" + owner + "/" + repo + "/branches/" + branch,
                { headers: ghHeaders(token) }
            );
            if (!branchRes.ok) throw new Error("Could not read branch (" + branchRes.status + "). Check owner/repo/branch/token.");
            const branchData = await branchRes.json();
            const treeSha = branchData.commit.sha;

            const treeRes = await fetch(
                "https://api.github.com/repos/" + owner + "/" + repo + "/git/trees/" + treeSha + "?recursive=1",
                { headers: ghHeaders(token) }
            );
            if (!treeRes.ok) throw new Error("Could not read repository tree (" + treeRes.status + ").");
            const treeData = await treeRes.json();

            const folders = treeData.tree
                .filter(function (t) { return t.type === "tree"; })
                .map(function (t) { return t.path; })
                .sort();

            els.folderSelect.innerHTML = '<option value="">— root —</option>' +
                folders.map(function (f) {
                    return '<option value="' + f.replace(/"/g, "&quot;") + '">' + f + "</option>";
                }).join("");

            const articleFiles = treeData.tree
                .filter(function (t) { return t.type === "blob" && /\.html?$/i.test(t.path); })
                .map(function (t) { return t.path; })
                .filter(function (p) { return EXCLUDED_ARTICLE_PATHS.indexOf(p) === -1; })
                .sort();

            els.articleSelect.innerHTML = '<option value="">— select an article —</option>' +
                articleFiles.map(function (f) {
                    return '<option value="' + f.replace(/"/g, "&quot;") + '">' + f + "</option>";
                }).join("");

            setStatus(els.connectStatus, "Connected. " + folders.length + " folder(s), " + articleFiles.length + " article(s) loaded.", "ok");
        } catch (err) {
            setStatus(els.connectStatus, err.message || "Connection failed.", "err");
        } finally {
            els.connectBtn.disabled = false;
        }
    });

    // ---------- article HTML generation ----------

    function esc(str) {
        return String(str || "").replace(/[&<>"']/g, function (c) {
            return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
        });
    }

    function badgeClass(badge) {
        if (badge === "Troubleshooting") return { bg: "rgb(255,235,235)", fg: "rgb(190,30,30)" };
        if (badge === "Reference") return { bg: "rgb(238,241,250)", fg: "rgb(74,85,120)" };
        if (badge === "Announcement") return { bg: "rgb(234,240,255)", fg: "rgb(47,91,255)" };
        return { bg: "rgb(231,247,240)", fg: "rgb(14,159,110)" }; // How-to
    }

    function readListValues(kind, selector) {
        return Array.from(lists[kind].container.querySelectorAll(selector))
            .map(function (el) { return el.value.trim(); })
            .filter(Boolean);
    }

    function buildArticleHtml(depthPrefix) {
        const title = els.articleTitle.value.trim() || "Untitled article";
        const lede = document.getElementById("articleLede").value.trim();
        const assumes = document.getElementById("articleAssumes").value.trim();
        const crumbApp = document.getElementById("crumbApp").value.trim();
        const crumbTopic = document.getElementById("crumbTopic").value.trim();
        const badge = document.getElementById("badgeType").value;
        const badgeColors = badgeClass(badge);
        const readTime = document.getElementById("readTime").value || "5";
        const updated = document.getElementById("updatedDate").value.trim();

        const prereqs = readListValues("prereq", ".pr-text");
        const steps = Array.from(lists.step.container.querySelectorAll(".caf-repeat-item")).map(function (row) {
            return {
                title: row.querySelector(".st-title").value.trim(),
                desc: row.querySelector(".st-desc").value.trim(),
            };
        }).filter(function (s) { return s.title; });

        const noteOn = els.noteEnabled.checked && els.noteText.value.trim();
        const verifyHeading = document.getElementById("verifyHeading").value.trim() || "Verify the configuration";
        const verifyText = document.getElementById("verifyText").value.trim();
        const verifyCodeLines = document.getElementById("verifyCode").value.split("\n").map(function (l) { return l.trim(); }).filter(Boolean);

        const troubles = readListValues("trouble", ".tb-text");

        const related = Array.from(lists.related.container.querySelectorAll(".caf-repeat-item")).map(function (row) {
            return {
                title: row.querySelector(".rl-title").value.trim(),
                sub: row.querySelector(".rl-sub").value.trim(),
            };
        }).filter(function (r) { return r.title; });

        const tags = readListValues("tag", ".tg-text");

        const sidebarApp = document.getElementById("sidebarApp").value.trim();
        const sidebarVersion = document.getElementById("sidebarVersion").value.trim();

        const sectionAnchors = [];
        if (prereqs.length) sectionAnchors.push({ id: "before", label: "Before you begin" });
        if (steps.length) sectionAnchors.push({ id: "steps", label: "Steps" });
        if (verifyText || verifyCodeLines.length) sectionAnchors.push({ id: "verify", label: verifyHeading });
        if (troubles.length) sectionAnchors.push({ id: "trouble", label: "Troubleshooting" });

        const prereqHtml = prereqs.map(function (p) {
            return '            <div class="helpfirst">\n' +
                '                <span style="color:rgb(47,91,255)">•</span>\n' +
                "                <span>" + esc(p) + "</span>\n" +
                "            </div>";
        }).join("\n");

        const stepsHtml = steps.map(function (s, i) {
            return '            <div class="openfirst">\n' +
                '                <div class="one">' + (i + 1) + "</div>\n" +
                '                <div class="opencontent">\n' +
                "                    <span>" + esc(s.title) + "</span>\n" +
                (s.desc ? '                    <span style="color:rgb(91,100,128)">' + esc(s.desc) + "</span>\n" : "") +
                "                </div>\n" +
                "            </div>";
        }).join("\n");

        const troubleHtml = troubles.map(function (t) {
            return '            <div class="helpfirst">\n' +
                '                <span style="color:rgb(47,91,255)">•</span>\n' +
                "                <span>" + esc(t) + "</span>\n" +
                "            </div>";
        }).join("\n");

        const relatedHtml = related.map(function (r) {
            return '        <a href="#" class="card">\n' +
                '            <span class="head">' + esc(r.title) + "</span>\n" +
                '            <span class="lower">' + esc(r.sub) + "</span>\n" +
                "        </a>";
        }).join("\n");

        const tagsHtml = tags.map(function (t) {
            return '                <span class="sla2">' + esc(t) + "</span>";
        }).join("\n");

        const onthisHtml = sectionAnchors.map(function (a) {
            return '            <a class="link" href="#' + a.id + '">' + esc(a.label) + "</a>";
        }).join("\n");

        return "<!DOCTYPE html>\n" +
            '<html lang="en">\n' +
            "<head>\n" +
            '<meta charset="UTF-8">\n' +
            '<meta name="viewport" content="width=device-width, initial-scale=1.0">\n' +
            "<title>" + esc(title) + "</title>\n" +
            '<link rel="stylesheet" href="' + depthPrefix + 'assets/kb.css">\n' +
            "</head>\n" +
            "<body>\n\n" +
            '<header class="kb-header">\n' +
            '    <a href="' + depthPrefix + 'index.html" class="kb-brand">\n' +
            '        <span class="kb-brand-badge">365</span>\n' +
            '        <span class="kb-brand-text">\n' +
            '            <span class="kb-brand-name">Apps365</span>\n' +
            '            <span class="kb-brand-sub">KNOWLEDGE BASE</span>\n' +
            "        </span>\n" +
            "    </a>\n" +
            '    <nav class="kb-nav">\n' +
            '        <a href="' + depthPrefix + 'index.html">Home</a>\n' +
            '        <a href="' + depthPrefix + 'index.html#articles">Articles</a>\n' +
            '        <a href="' + depthPrefix + 'features/feature.html">Features</a>\n' +
            "    </nav>\n" +
            '    <div class="kb-header-actions">\n' +
            '        <div class="kb-search">\n' +
            "            <span>⌕</span>\n" +
            "            <span>Search the knowledge base</span>\n" +
            "            <kbd>⌘K</kbd>\n" +
            "        </div>\n" +
            '        <a class="kb-cta" href="#">Submit a ticket</a>\n' +
            "    </div>\n" +
            "</header>\n\n" +
            '<div class="data">\n' +
            '    <div class="left">\n' +
            '        <div class="knowledge">\n' +
            '            <span style="cursor:pointer">Knowledge Base</span>\n' +
            "            <span>/</span>\n" +
            "            <span>" + esc(crumbApp) + "</span>\n" +
            "            <span>/</span>\n" +
            '            <span style="color:rgb(11,16,32)">' + esc(crumbTopic) + "</span>\n" +
            "        </div>\n" +
            '        <div class="how">\n' +
            '            <span class="howto" style="background:' + badgeColors.bg + ";color:" + badgeColors.fg + '">' + esc(badge) + "</span>\n" +
            '            <span style="color:rgb(138,146,174)">' + esc(readTime) + " min read" + (updated ? " · Updated " + esc(updated) : "") + "</span>\n" +
            "        </div>\n" +
            '        <h1 class="configure">' + esc(title) + "</h1>\n" +
            (lede ? '        <p class="define">' + esc(lede) + "</p>\n" : "") +
            (assumes ? '        <p class="article">' + esc(assumes) + "</p>\n" : "") +
            (prereqs.length ?
                '        <h2 class="begin" id="before">Before you begin</h2>\n' +
                '        <div class="helping">\n' + prereqHtml + "\n        </div>\n" : "") +
            (steps.length ?
                '        <h2 class="steps" id="steps">Steps</h2>\n' +
                '        <div class="open">\n' + stepsHtml + "\n        </div>\n" : "") +
            (noteOn ?
                '        <div class="note">\n' +
                "            <span>⚠</span>\n" +
                '            <div class="warn"><strong>Note — </strong>' + esc(els.noteText.value.trim()) + "</div>\n" +
                "        </div>\n" : "") +
            (verifyText || verifyCodeLines.length ?
                '        <h2 class="verify" id="verify">' + esc(verifyHeading) + "</h2>\n" +
                (verifyText ? '        <p class="verifycontent">' + esc(verifyText) + "</p>\n" : "") +
                (verifyCodeLines.length ?
                    '        <div class="getapps">\n' +
                    verifyCodeLines.map(function (l) { return "            <span>" + esc(l) + "</span>"; }).join("\n") + "\n" +
                    "        </div>\n" : "") : "") +
            (troubles.length ?
                '        <h2 class="begin" id="trouble">Troubleshooting</h2>\n' +
                '        <div class="helping">\n' + troubleHtml + "\n        </div>\n" : "") +
            '        <div class="helpful">\n' +
            '            <div class="helpfulcontent">\n' +
            '                <span style="font-weight:600">Was this article helpful?</span>\n' +
            "            </div>\n" +
            '            <div class="buttons">\n' +
            '                <button class="thanks">Yes, thanks</button>\n' +
            '                <button class="thanks">Not really</button>\n' +
            "            </div>\n" +
            "        </div>\n" +
            (related.length ?
                '        <span class="related-label">Related articles</span>\n' +
                '        <div class="cards">\n' + relatedHtml + "\n        </div>\n" : "") +
            "    </div>\n\n" +
            '    <div class="sidebar">\n' +
            (onthisHtml ?
                '        <div>\n' +
                '            <span class="onthis">On this page</span>\n' +
                '            <div class="onthiscontent">\n' + onthisHtml + "\n            </div>\n" +
                "        </div>\n" : "") +
            (sidebarApp ?
                '        <div class="apply">\n' +
                '            <div class="applies">Applies to</div>\n' +
                "            <div>" + esc(sidebarApp) + "</div>\n" +
                (sidebarVersion ? '            <span style="color:rgb(107,116,149)">' + esc(sidebarVersion) + "</span>\n" : "") +
                (tagsHtml ? '            <div class="flex">\n' + tagsHtml + "\n            </div>\n" : "") +
                "        </div>\n" : "") +
            '        <div class="ask">\n' +
            "            ✦\n" +
            "            <div>Ask about this article</div>\n" +
            '            <div style="color:rgb(167,176,208)">The assistant answers from this page and its related docs.</div>\n' +
            "        </div>\n" +
            "    </div>\n" +
            "</div>\n\n" +
            "</body>\n" +
            "</html>\n";
    }

    function depthPrefixFor(path) {
        const segments = path.split("/").length - 1; // folders only
        return segments > 0 ? "../".repeat(segments) : "";
    }

    // ---------- publish ----------

    function base64EncodeUtf8(str) {
        return btoa(unescape(encodeURIComponent(str)));
    }

    function base64DecodeUtf8(b64) {
        return decodeURIComponent(escape(atob(b64.replace(/\n/g, ""))));
    }

    els.form.addEventListener("submit", async function (e) {
        e.preventDefault();

        const owner = els.ghOwner.value.trim();
        const repo = els.ghRepo.value.trim();
        const branch = els.ghBranch.value.trim() || "main";
        const token = els.ghToken.value.trim();
        const mode = currentMode();

        if (!owner || !repo || !token) {
            setStatus(els.publishStatus, "Fill in the GitHub repository details first.", "err");
            return;
        }
        if (!els.articleTitle.value.trim()) {
            setStatus(els.publishStatus, "Give the article a title.", "err");
            return;
        }
        if (mode === "edit" && !currentEdit) {
            setStatus(els.publishStatus, "Select an existing article to edit first.", "err");
            return;
        }

        const path = mode === "edit" ? currentEdit.path : currentFilePath();

        saveSettings();
        els.publishBtn.disabled = true;
        setStatus(els.publishStatus, mode === "edit" ? "Updating…" : "Publishing…", "pending");

        try {
            const html = buildArticleHtml(depthPrefixFor(path));
            const content = base64EncodeUtf8(html);

            const body = {
                message: (mode === "edit" ? "Update KB article: " : "Add KB article: ") + els.articleTitle.value.trim(),
                content: content,
                branch: branch,
            };
            if (mode === "edit") body.sha = currentEdit.sha;

            const res = await fetch(
                "https://api.github.com/repos/" + owner + "/" + repo + "/contents/" + path,
                {
                    method: "PUT",
                    headers: Object.assign({ "Content-Type": "application/json" }, ghHeaders(token)),
                    body: JSON.stringify(body),
                }
            );

            if (!res.ok) {
                const errBody = await res.json().catch(function () { return {}; });
                throw new Error(errBody.message || ("GitHub API error (" + res.status + ")"));
            }

            const data = await res.json();
            setStatus(els.publishStatus, mode === "edit" ? "Updated." : "Published.", "ok");
            addPublishedEntry(els.articleTitle.value.trim(), data.content && data.content.html_url, path, mode);
            currentEdit = null;
            resetArticleFields();
        } catch (err) {
            setStatus(els.publishStatus, err.message || "Publish failed.", "err");
        } finally {
            els.publishBtn.disabled = false;
        }
    });

    function addPublishedEntry(title, url, path, mode) {
        els.publishedCard.style.display = "block";
        const row = document.createElement("div");
        row.className = "caf-published-item";
        row.innerHTML =
            "<span>" + (mode === "edit" ? "Updated: " : "Added: ") + esc(title) +
            ' <span style="color:rgb(74,85,120)">(' + esc(path) + ")</span></span>" +
            (url ? '<a href="' + url + '" target="_blank" rel="noopener">View on GitHub →</a>' : "<span>Committed</span>");
        els.publishedList.prepend(row);
    }

    function resetArticleFields() {
        const modeBeforeReset = currentMode();
        els.form.reset();
        Object.keys(lists).forEach(function (kind) {
            lists[kind].container.innerHTML = "";
        });
        addPrereq();
        addStep();
        addStep();
        addTrouble();
        addTag();
        addTag();
        slugManuallyEdited = false;
        loadSettings(); // keep owner/repo/branch, token intentionally cleared by form.reset()
        // form.reset() also reverts the mode radios to their default (create) — restore
        // whichever mode the user was actually in, so an edit-mode publish doesn't bounce
        // them back to create mode.
        els.modeCreate.checked = modeBeforeReset === "create";
        els.modeEdit.checked = modeBeforeReset === "edit";
        els.articleSelect.value = "";
        setStatus(els.loadStatus, "", "");
        refreshModeUi();
        updatePathPreview();
    }

    els.resetBtn.addEventListener("click", function () {
        currentEdit = null;
        resetArticleFields();
        setStatus(els.publishStatus, "", "");
    });

    // ---------- preview ----------

    function openPreview() {
        // The preview renders inside this same page, so asset links resolve
        // relative to create-article.html's own location — no folder-depth prefix needed.
        els.previewFrame.srcdoc = buildArticleHtml("");
        els.previewOverlay.classList.add("open");
        document.body.style.overflow = "hidden";
    }

    function closePreview() {
        els.previewOverlay.classList.remove("open");
        document.body.style.overflow = "";
    }

    els.previewBtn.addEventListener("click", openPreview);
    els.previewClose.addEventListener("click", closePreview);
    els.previewOverlay.addEventListener("click", function (e) {
        if (e.target === els.previewOverlay) closePreview();
    });
    document.addEventListener("keydown", function (e) {
        if (e.key === "Escape" && els.previewOverlay.classList.contains("open")) closePreview();
    });

    // ---------- load an existing article for editing ----------

    function textOf(el) {
        return el ? el.textContent.trim() : "";
    }

    function parseArticleFieldsFromHtml(html) {
        const doc = new DOMParser().parseFromString(html, "text/html");

        const crumbSpans = doc.querySelectorAll(".knowledge > span");
        const crumbApp = crumbSpans.length > 2 ? textOf(crumbSpans[2]) : "";
        const crumbTopic = crumbSpans.length > 4 ? textOf(crumbSpans[4]) : "";

        const badge = textOf(doc.querySelector(".howto"));
        const metaSpan = doc.querySelector(".how > span:last-child");
        const metaText = textOf(metaSpan);
        const metaMatch = metaText.match(/^(\d+)\s*min read(?:\s*·\s*Updated\s*(.+))?$/i);
        const readTime = metaMatch ? metaMatch[1] : "5";
        const updatedDate = metaMatch && metaMatch[2] ? metaMatch[2].trim() : "";

        const title = textOf(doc.querySelector(".configure"));
        const lede = textOf(doc.querySelector(".define"));
        const assumes = textOf(doc.querySelector(".article"));

        function bulletsAfter(headingId) {
            const heading = doc.getElementById(headingId);
            if (!heading) return [];
            const list = heading.nextElementSibling;
            if (!list) return [];
            return Array.from(list.querySelectorAll(".helpfirst")).map(function (row) {
                const spans = row.querySelectorAll("span");
                return spans.length > 1 ? textOf(spans[1]) : textOf(spans[0]);
            }).filter(Boolean);
        }

        const prereqs = bulletsAfter("before");
        const troubles = bulletsAfter("trouble");

        const stepsHeading = doc.getElementById("steps");
        const steps = [];
        if (stepsHeading && stepsHeading.nextElementSibling) {
            Array.from(stepsHeading.nextElementSibling.querySelectorAll(".openfirst")).forEach(function (row) {
                const spans = row.querySelectorAll(".opencontent > span");
                steps.push({
                    title: spans.length > 0 ? textOf(spans[0]) : "",
                    desc: spans.length > 1 ? textOf(spans[1]) : "",
                });
            });
        }

        const noteEl = doc.querySelector(".note .warn");
        const noteText = noteEl ? textOf(noteEl).replace(/^Note\s*—\s*/, "") : "";

        const verifyHeadingEl = doc.getElementById("verify");
        let verifyHeading = "Verify the configuration";
        let verifyText = "";
        let verifyCode = "";
        if (verifyHeadingEl) {
            verifyHeading = textOf(verifyHeadingEl);
            let node = verifyHeadingEl.nextElementSibling;
            while (node && node.tagName !== "H2" && !node.classList.contains("helpful")) {
                if (node.classList.contains("verifycontent")) {
                    verifyText = textOf(node);
                } else if (node.classList.contains("getapps")) {
                    verifyCode = Array.from(node.querySelectorAll("span")).map(textOf).join("\n");
                }
                node = node.nextElementSibling;
            }
        }

        const related = Array.from(doc.querySelectorAll(".cards .card")).map(function (card) {
            return {
                title: textOf(card.querySelector(".head")),
                sub: textOf(card.querySelector(".lower")),
            };
        });

        const applyEl = doc.querySelector(".apply");
        let sidebarApp = "", sidebarVersion = "", tags = [];
        if (applyEl) {
            const children = Array.from(applyEl.children);
            const appDiv = children.find(function (c) { return c.tagName === "DIV" && !c.classList.contains("applies") && !c.classList.contains("flex"); });
            sidebarApp = textOf(appDiv);
            const versionSpan = children.find(function (c) { return c.tagName === "SPAN"; });
            sidebarVersion = textOf(versionSpan);
            tags = Array.from(applyEl.querySelectorAll(".sla2")).map(textOf);
        }

        return {
            crumbApp: crumbApp, crumbTopic: crumbTopic, badge: badge, readTime: readTime, updatedDate: updatedDate,
            title: title, lede: lede, assumes: assumes,
            prereqs: prereqs, steps: steps, troubles: troubles,
            noteEnabled: Boolean(noteText), noteText: noteText,
            verifyHeading: verifyHeading, verifyText: verifyText, verifyCode: verifyCode,
            related: related, sidebarApp: sidebarApp, sidebarVersion: sidebarVersion, tags: tags,
        };
    }

    function setListRows(kind, items, addFn, fillFn) {
        lists[kind].container.innerHTML = "";
        if (!items.length) {
            addFn();
            return;
        }
        items.forEach(function (item) {
            addFn();
            const row = lists[kind].container.lastElementChild;
            fillFn(row, item);
        });
    }

    function populateFormFromParsed(p) {
        document.getElementById("crumbApp").value = p.crumbApp;
        document.getElementById("crumbTopic").value = p.crumbTopic;
        if (p.badge) document.getElementById("badgeType").value = p.badge;
        document.getElementById("readTime").value = p.readTime;
        document.getElementById("updatedDate").value = p.updatedDate;
        els.articleTitle.value = p.title;
        slugManuallyEdited = true; // keep the existing file's path, don't re-slugify from title
        document.getElementById("articleLede").value = p.lede;
        document.getElementById("articleAssumes").value = p.assumes;

        setListRows("prereq", p.prereqs, addPrereq, function (row, text) {
            row.querySelector(".pr-text").value = text;
        });
        setListRows("step", p.steps, addStep, function (row, step) {
            row.querySelector(".st-title").value = step.title;
            row.querySelector(".st-desc").value = step.desc;
        });
        setListRows("trouble", p.troubles, addTrouble, function (row, text) {
            row.querySelector(".tb-text").value = text;
        });
        setListRows("related", p.related, addRelated, function (row, r) {
            row.querySelector(".rl-title").value = r.title;
            row.querySelector(".rl-sub").value = r.sub;
        });
        setListRows("tag", p.tags, addTag, function (row, text) {
            row.querySelector(".tg-text").value = text;
        });

        els.noteEnabled.checked = p.noteEnabled;
        els.noteText.value = p.noteText;
        document.getElementById("verifyHeading").value = p.verifyHeading;
        document.getElementById("verifyText").value = p.verifyText;
        document.getElementById("verifyCode").value = p.verifyCode;
        document.getElementById("sidebarApp").value = p.sidebarApp;
        document.getElementById("sidebarVersion").value = p.sidebarVersion;
    }

    els.articleSelect.addEventListener("change", async function () {
        const path = els.articleSelect.value;
        currentEdit = null;
        refreshModeUi();
        if (!path) return;

        const owner = els.ghOwner.value.trim();
        const repo = els.ghRepo.value.trim();
        const branch = els.ghBranch.value.trim() || "main";
        const token = els.ghToken.value.trim();

        if (!owner || !repo || !token) {
            setStatus(els.loadStatus, "Connect to GitHub first.", "err");
            return;
        }

        setStatus(els.loadStatus, "Loading…", "pending");
        try {
            const res = await fetch(
                "https://api.github.com/repos/" + owner + "/" + repo + "/contents/" + path + "?ref=" + encodeURIComponent(branch),
                { headers: ghHeaders(token) }
            );
            if (!res.ok) throw new Error("Could not load file (" + res.status + ").");
            const data = await res.json();
            const html = base64DecodeUtf8(data.content);

            populateFormFromParsed(parseArticleFieldsFromHtml(html));
            currentEdit = { path: path, sha: data.sha };
            els.fileSlug.value = path.split("/").slice(-1)[0].replace(/\.html?$/i, "");
            els.folderSelect.value = "";
            els.newFolder.value = "";
            updatePathPreview();
            els.pathPreview.textContent = path;
            refreshModeUi();
            setStatus(els.loadStatus, "Loaded. Editing " + path, "ok");
        } catch (err) {
            currentEdit = null;
            refreshModeUi();
            setStatus(els.loadStatus, err.message || "Failed to load article.", "err");
        }
    });
})();
