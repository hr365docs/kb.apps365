
(function () {
    "use strict";

    // ========================================
    // CONFIGURATION
    // ========================================

    const GITHUB = {
        owner: "vikascubiclogics",
        repo: "KBPortal",
        branch: "main",
        folder: "main/",
        batchSize: 4
    };

    // Existing HTML page containing website header/footer
    const LAYOUT_SOURCE =
        "/sharepoint-helpdesk/index.html";

    const PRODUCTS = {
        helpdesk: {
            name: "Helpdesk 365",
            routes: [
                "sharepoint-helpdesk",
                "helpdesk-365",
                "helpdesk"
            ],
            keywords: [
                "helpdesk 365",
                "helpdesk",
                "help desk"
            ],
            folders: [
                "main/helpdesk/",
                "main/helpdesk-365/",
                "main/HD/"
            ]
        },

        onboarding: {
            name: "Employee Onboarding 365",
            routes: [
                "sharepoint-employee-onboarding",
                "employee-onboarding",
                "onboarding"
            ],
            keywords: [
                "employee onboarding",
                "onboarding 365",
                "onboarding"
            ],
            folders: [
                "main/onboarding/",
                "main/employee-onboarding/"
            ]
        },

        hrms: {
            name: "HR365 HRMS",
            routes: [
                "HRMS365",
                "HRMS-HR365",
                "hrms"
            ],
            keywords: [
                "hrms",
                "hr365"
            ],
            folders: [
                "main/hrms/",
                "main/HRMS/"
            ]
        },

        asset: {
            name: "Asset 365",
            routes: [
                "asset-management",
                "asset-365"
            ],
            keywords: [
                "asset 365",
                "asset365"
            ],
            folders: [
                "main/asset/",
                "main/Asset/"
            ]
        },

        expense: {
            name: "Expense 365",
            routes: [
                "expense-management",
                "expense-365"
            ],
            keywords: [
                "expense 365",
                "expense365"
            ],
            folders: [
                "main/expense/",
                "main/Expense/"
            ]
        },

        recruitment: {
            name: "Recruitment Management 365",
            routes: [
                "recruitment-management",
                "recruitment"
            ],
            keywords: [
                "recruitment management 365",
                "recruitment 365"
            ],
            folders: [
                "main/recruitment/"
            ]
        }
    };

    // ========================================
    // DOM ELEMENTS
    // ========================================

    const $ = id => document.getElementById(id);

    const elements = {
        cards: $("articlesContainer"),
        search: $("articleSearch"),
        count: $("articleCount"),
        empty: $("emptyMessage"),
        emptyDescription: $("emptyDescription"),
        title: $("pageTitle"),
        description: $("pageDescription"),
        modal: $("articleModal"),
        modalTitle: $("modalTitle"),
        frame: $("articleFrame"),
        close: $("closeModal")
    };

    let articles = [];
    let loading = false;
    let previousFocus = null;

    const normalize = value =>
        String(value || "").trim().toLowerCase();

    // ========================================
    // COMMON HEADER AND FOOTER
    // ========================================

    function fixResourceURLs(element, sourceURL) {
        const attributes = ["href", "src", "poster"];

        const nodes = [
            element,
            ...element.querySelectorAll("*")
        ];

        nodes.forEach(node => {
            attributes.forEach(attribute => {
                const value = node.getAttribute(attribute);

                if (!value) return;

                if (
                    value.startsWith("#") ||
                    /^(data:|javascript:)/i.test(value)
                ) {
                    return;
                }

                try {
                    const absolute = new URL(
                        value,
                        sourceURL
                    );

                    if (
                        absolute.protocol === "http:" ||
                        absolute.protocol === "https:"
                    ) {
                        node.setAttribute(
                            attribute,
                            absolute.href
                        );
                    }
                } catch (error) {
                    // Ignore invalid URLs
                }
            });
        });
    }

    async function loadSharedLayout() {
        try {
            const sourceURL = new URL(
                LAYOUT_SOURCE,
                window.location.origin
            );

            const response = await fetch(sourceURL.href);

            if (!response.ok) {
                throw new Error(
                    "Layout HTTP " + response.status
                );
            }

            const html = await response.text();

            const doc = new DOMParser().parseFromString(
                html,
                "text/html"
            );

            const header = doc.querySelector("header");
            const footer = doc.querySelector("footer");

            const headerContainer =
                $("header-container");

            const footerContainer =
                $("footer-container");

            if (header && headerContainer) {
                const copy = document.importNode(
                    header,
                    true
                );

                fixResourceURLs(copy, sourceURL.href);

                headerContainer.replaceChildren(copy);
            } else {
                console.warn(
                    "Shared header markup not found."
                );
            }

            if (footer && footerContainer) {
                const copy = document.importNode(
                    footer,
                    true
                );

                fixResourceURLs(copy, sourceURL.href);

                footerContainer.replaceChildren(copy);
            } else {
                console.warn(
                    "Shared footer markup not found."
                );
            }

            console.log(
                "Shared layout loaded:",
                {
                    header: !!header,
                    footer: !!footer
                }
            );

        } catch (error) {
            console.error(
                "Shared header/footer error:",
                error
            );
        }
    }

    // ========================================
    // PRODUCT DETECTION
    // ========================================

    function matchProduct(value) {
        const text = normalize(value);

        if (PRODUCTS[text]) return text;

        for (const [key, product] of
            Object.entries(PRODUCTS)) {

            if (product.routes.some(route =>
                text.includes(normalize(route))
            )) {
                return key;
            }
        }

        return null;
    }

    function detectProduct() {
        const params = new URLSearchParams(
            window.location.search
        );

        // Explicit product takes priority
        const product = params.get("product");

        if (product) {
            return matchProduct(product);
        }

        const source = params.get("source");

        if (source) {
            return matchProduct(source);
        }

        // Current URL
        const current = matchProduct(
            window.location.pathname
        );

        if (current) return current;

        // Same-origin referring page
        if (document.referrer) {
            try {
                const ref = new URL(document.referrer);

                if (ref.origin === window.location.origin) {
                    return matchProduct(ref.pathname);
                }
            } catch (error) {}
        }

        return null;
    }

    const CURRENT_PRODUCT = detectProduct();

    function updateHeading() {
        if (!CURRENT_PRODUCT) {
            elements.title.textContent =
                "How-to Guides";

            elements.description.textContent =
                "Select a product to view its guides.";

            return;
        }

        const product = PRODUCTS[CURRENT_PRODUCT];

        elements.title.textContent =
            product.name + " How-to Guides";

        elements.description.textContent =
            "Step-by-step tutorials, setup guides, " +
            "and product documentation.";
    }

    // ========================================
    // GITHUB URL HELPERS
    // ========================================

    function encodePath(path) {
        return path.split("/")
            .map(encodeURIComponent)
            .join("/");
    }

    function rawURL(path) {
        return (
            "https://raw.githubusercontent.com/" +
            GITHUB.owner + "/" +
            GITHUB.repo + "/" +
            GITHUB.branch + "/" +
            encodePath(path)
        );
    }

    function fallbackTitle(path) {
        return path.split("/").pop()
            .replace(/\.html?$/i, "")
            .replace(/[-_]/g, " ");
    }

    function formatDate(value) {
        if (!value) return "Date unavailable";

        const date = new Date(value);

        if (!Number.isFinite(date.getTime())) {
            return "Date unavailable";
        }

        return date.toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric"
        });
    }

    // ========================================
    // ARTICLE DATA EXTRACTION
    // ========================================

    function readBalancedObject(text, start) {
        let depth = 0;
        let quoted = false;
        let escaped = false;

        for (let i = start; i < text.length; i++) {
            const char = text[i];

            if (quoted) {
                if (escaped) {
                    escaped = false;
                } else if (char === "\\") {
                    escaped = true;
                } else if (char === '"') {
                    quoted = false;
                }
                continue;
            }

            if (char === '"') {
                quoted = true;
            } else if (char === "{") {
                depth++;
            } else if (char === "}") {
                depth--;

                if (depth === 0) {
                    return text.slice(start, i + 1);
                }
            }
        }

        return null;
    }

    function parseArticleData(doc) {
        const metadata = doc.getElementById(
            "article-data"
        );

        if (metadata) {
            try {
                return JSON.parse(metadata.textContent);
            } catch (error) {
                console.warn("Invalid article-data JSON");
            }
        }

        // Existing ArticleData assignment fallback.
        // Supports strict JSON object literals and
        // JSON.stringify-compatible string values.

        for (const script of doc.querySelectorAll("script")) {
            if (script.src) continue;

            const text = script.textContent || "";

            const match = /\bArticleData\s*=\s*/.exec(text);

            if (!match) continue;

            const start = match.index + match[0].length;
            const remaining = text.slice(start).trimStart();

            try {
                if (remaining.startsWith("{")) {
                    const raw = readBalancedObject(
                        remaining,
                        0
                    );

                    if (raw) return JSON.parse(raw);
                }

                if (remaining.startsWith('"')) {
                    // Parse a quoted JSON string safely
                    let end = 1;
                    let escaped = false;

                    for (; end < remaining.length; end++) {
                        const c = remaining[end];

                        if (escaped) {
                            escaped = false;
                        } else if (c === "\\") {
                            escaped = true;
                        } else if (c === '"') {
                            break;
                        }
                    }

                    const str = JSON.parse(
                        remaining.slice(0, end + 1)
                    );

                    return JSON.parse(str);
                }
            } catch (error) {
                console.warn(
                    "Could not parse ArticleData."
                );
            }
        }

        return {};
    }

    function getMeta(doc, name) {
        const meta = Array.from(
            doc.querySelectorAll("meta")
        ).find(item =>
            item.getAttribute("name") === name ||
            item.getAttribute("property") === name
        );

        return meta?.getAttribute("content") || "";
    }

    function parseArticle(path, html) {
        const doc = new DOMParser().parseFromString(
            html,
            "text/html"
        );

        const data = parseArticleData(doc);

        const title =
            data.title ||
            data.metaTitle ||
            doc.querySelector("h1")?.textContent?.trim() ||
            doc.title ||
            fallbackTitle(path);

        const date =
            data.updatedDate ||
            getMeta(doc, "article:modified_time") ||
            getMeta(doc, "article:published_time") ||
            getMeta(doc, "date") ||
            "";

        const text =
            (doc.querySelector("article") || doc.body)
                ?.textContent || "";

        const words = text.trim()
            .split(/\s+/)
            .filter(Boolean).length;

        const estimatedTime = Math.max(
            1,
            Math.ceil(words / 225)
        );

        return {
            path,
            html,
            title: String(title).trim(),
            date,
            readTime:
                parseInt(data.readTime, 10) ||
                estimatedTime,
            category: data.badge || "How-to",
            description:
                data.lede ||
                data.metaDescription ||
                getMeta(doc, "description") ||
                "",
            product: data.product || "",
            sidebarApp: data.sidebarApp || "",
            crumbApp: data.crumbApp || ""
        };
    }

    // ========================================
    // ARTICLE PRODUCT MATCHING
    // ========================================

    function articleProduct(article) {
        // Explicit product is authoritative
        if (article.product) {
            return matchProduct(article.product);
        }

        const metadata = normalize(
            article.sidebarApp + " " +
            article.crumbApp
        );

        for (const [key, product] of
            Object.entries(PRODUCTS)) {

            if (product.keywords.some(keyword =>
                metadata.includes(normalize(keyword))
            )) {
                return key;
            }
        }

        const path = normalize(article.path);

        for (const [key, product] of
            Object.entries(PRODUCTS)) {

            if (product.folders.some(folder =>
                path.startsWith(normalize(folder))
            )) {
                return key;
            }
        }

        const title = normalize(article.title);

        for (const [key, product] of
            Object.entries(PRODUCTS)) {

            if (product.keywords.some(keyword =>
                title.includes(normalize(keyword))
            )) {
                return key;
            }
        }

        return null;
    }

    // ========================================
    // CARD CREATION
    // ========================================

    function createCard(article) {
        const card = document.createElement("article");
        card.className = "how-to-card";

        const badge = document.createElement("span");
        badge.className = "how-to-category";
        badge.textContent = article.category;

        const title = document.createElement("h3");
        title.textContent = article.title;

        const description = document.createElement("p");
        description.className = "how-to-description";
        description.textContent = article.description;

        if (!article.description) {
            description.hidden = true;
        }

        const footer = document.createElement("div");
        footer.className = "how-to-card-footer";

        const meta = document.createElement("div");
        meta.className = "how-to-meta";

        const date = document.createElement("span");
        date.textContent =
            "📅 " + formatDate(article.date);

        const time = document.createElement("span");
        time.textContent =
            "◷ " + article.readTime + " min read";

        meta.append(date, time);

        const button = document.createElement("button");
        button.type = "button";
        button.className = "how-to-read";
        button.textContent = "Read Article →";

        button.addEventListener("click", () => {
            openArticle(article);
        });

        footer.append(meta, button);

        card.append(
            badge,
            title,
            description,
            footer
        );

        return card;
    }

    // ========================================
    // CARD RENDERING
    // ========================================

    function renderArticles() {
        const query = normalize(elements.search.value);

        const filtered = articles.filter(article => {
            if (articleProduct(article) !== CURRENT_PRODUCT) {
                return false;
            }

            const text = normalize(
                article.title + " " +
                article.description + " " +
                article.category
            );

            return text.includes(query);
        });

        const fragment =
            document.createDocumentFragment();

        filtered.forEach(article => {
            fragment.appendChild(createCard(article));
        });

        elements.cards.replaceChildren(fragment);

        elements.empty.hidden =
            loading || filtered.length > 0;

        elements.count.textContent = loading
            ? filtered.length + " guides loaded..."
            : filtered.length + " How-to Guides Found";

        if (!loading && filtered.length === 0) {
            elements.emptyDescription.textContent =
                query
                    ? "Try another search keyword."
                    : "No matching product guides found.";
        }
    }

    // ========================================
    // ARTICLE VIEWER
    // ========================================

    function openArticle(article) {
        previousFocus = document.activeElement;

        elements.modalTitle.textContent =
            article.title;

        const doc = new DOMParser().parseFromString(
            article.html,
            "text/html"
        );

        const directory = article.path.substring(
            0,
            article.path.lastIndexOf("/") + 1
        );

        const base = doc.createElement("base");
        base.href = rawURL(directory);

        doc.querySelectorAll("base").forEach(
            item => item.remove()
        );

        doc.head.prepend(base);

        elements.frame.srcdoc =
            "<!DOCTYPE html>\n" +
            doc.documentElement.outerHTML;

        elements.modal.hidden = false;
        document.body.style.overflow = "hidden";

        elements.close.focus();
    }

    function closeArticle() {
        elements.modal.hidden = true;
        elements.frame.removeAttribute("srcdoc");
        document.body.style.overflow = "";

        if (previousFocus?.isConnected) {
            previousFocus.focus();
        }
    }

    elements.close.addEventListener(
        "click",
        closeArticle
    );

    elements.modal.addEventListener("click", event => {
        if (event.target === elements.modal) {
            closeArticle();
        }
    });

    document.addEventListener("keydown", event => {
        if (
            event.key === "Escape" &&
            !elements.modal.hidden
        ) {
            closeArticle();
        }
    });

    elements.search.addEventListener(
        "input",
        renderArticles
    );

    // ========================================
    // GITHUB LOADER
    // ========================================

    async function fetchArticle(file) {
        const response = await fetch(
            rawURL(file.path)
        );

        if (!response.ok) {
            throw new Error(
                "Failed to fetch " + file.path
            );
        }

        return parseArticle(
            file.path,
            await response.text()
        );
    }

    async function loadArticles() {
        if (!CURRENT_PRODUCT) {
            elements.count.textContent =
                "Product not identified.";

            elements.empty.hidden = false;

            elements.emptyDescription.textContent =
                "Use ?product=helpdesk, " +
                "?product=onboarding, or another product.";

            return;
        }

        loading = true;

        elements.count.textContent =
            "Loading " +
            PRODUCTS[CURRENT_PRODUCT].name +
            " guides...";

        try {
            const treeURL =
                "https://api.github.com/repos/" +
                GITHUB.owner + "/" +
                GITHUB.repo +
                "/git/trees/" +
                GITHUB.branch +
                "?recursive=1";

            const response = await fetch(treeURL);

            if (!response.ok) {
                throw new Error(
                    "GitHub HTTP " + response.status
                );
            }

            const data = await response.json();

            if (data.truncated) {
                throw new Error(
                    "Incomplete repository file tree."
                );
            }

            const files = data.tree.filter(file =>
                file.type === "blob" &&
                file.path.startsWith(GITHUB.folder) &&
                /\.html?$/i.test(file.path)
            );

            let failed = 0;

            for (
                let i = 0;
                i < files.length;
                i += GITHUB.batchSize
            ) {
                const batch = files.slice(
                    i,
                    i + GITHUB.batchSize
                );

                const results = await Promise.allSettled(
                    batch.map(fetchArticle)
                );

                results.forEach(result => {
                    if (result.status === "fulfilled") {
                        articles.push(result.value);
                    } else {
                        failed++;
                        console.warn(result.reason);
                    }
                });

                articles.sort((a, b) =>
                    (Date.parse(b.date) || 0) -
                    (Date.parse(a.date) || 0)
                );

                renderArticles();
            }

            loading = false;
            renderArticles();

            if (failed) {
                elements.count.textContent +=
                    " (" + failed + " failed)";
            }

        } catch (error) {
            loading = false;

            console.error("GitHub loader:", error);

            elements.count.textContent =
                "Unable to load articles: " +
                error.message;

            elements.empty.hidden = false;

            elements.emptyDescription.textContent =
                "Check GitHub API access and file paths.";
        }
    }

    // ========================================
    // INITIALIZE
    // ========================================

    updateHeading();

    // Header and footer load independently
    loadSharedLayout();

    // Articles load independently
    loadArticles();

})();
