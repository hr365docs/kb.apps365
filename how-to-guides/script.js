
(function () {
    "use strict";

    // =====================================
    // 1. GITHUB CONFIGURATION
    // =====================================

    const CONFIG = {
        owner: "vikascubiclogics",
        repo: "KBPortal",
        branch: "main",
        folder: "main/",
        batchSize: 4
    };

    const API = "https://api.github.com";
    const RAW = "https://raw.githubusercontent.com";

    // =====================================
    // 2. PRODUCT CONFIGURATION
    // =====================================

    const PRODUCTS = {
        helpdesk: {
            name: "Helpdesk 365",
            routes: [
                "sharepoint-helpdesk",
                "helpdesk-365",
                "helpdesk"
            ],
            articleNames: [
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

        hrms: {
            name: "HR365 HRMS",
            routes: [
                "HRMS365",
                "HRMS-HR365",
                "sharepoint-hr-management",
                "hrms"
            ],
            articleNames: [
                "hr365",
                "hrms",
                "human resource management"
            ],
            folders: [
                "main/hrms/",
                "main/HRMS/"
            ]
        },

        asset: {
            name: "Asset 365",
            routes: [
                "asset-365",
                "asset-management",
                "sharepoint-asset-management"
            ],
            articleNames: [
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
                "expense-365",
                "expense-management"
            ],
            articleNames: [
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
                "recruitment",
                "recruitment-management"
            ],
            articleNames: [
                "recruitment management 365",
                "recruitment 365"
            ],
            folders: [
                "main/recruitment/"
            ]
        },

        iapps: {
            name: "Apps365",
            routes: ["IApps-365"],
            articleNames: ["iapps 365"],
            folders: ["main/iapps/"]
        },
        onboarding: {
            name: "Employee Onboarding 365",
            routes: [
                "sharepoint-employee-onboarding",
                "employee-onboarding",
                "onboarding",
                "onboarding-365"
            ],
            articleNames: [
                "employee onboarding 365",
                "employee onboarding",
                "onboarding 365",
                "onboarding"
            ],
            folders: [
                "main/onboarding/",
                "main/employee-onboarding/",
                "main/Onboarding/"
            ]
        },
    };

    // =====================================
    // 3. ELEMENTS
    // =====================================

    const container =
        document.getElementById("articlesContainer");

    const searchInput =
        document.getElementById("articleSearch");

    const articleCount =
        document.getElementById("articleCount");

    const emptyMessage =
        document.getElementById("emptyMessage");

    const emptyDescription =
        document.getElementById("emptyDescription");

    const pageTitle =
        document.getElementById("pageTitle");

    const pageDescription =
        document.getElementById("pageDescription");

    const modal =
        document.getElementById("articleModal");

    const modalTitle =
        document.getElementById("modalTitle");

    const articleFrame =
        document.getElementById("articleFrame");

    const closeButton =
        document.getElementById("closeModal");

    let articles = [];
    let loading = false;
    let failedCount = 0;
    let lastFocus = null;

    // =====================================
    // 4. PRODUCT DETECTION
    // =====================================

    function normalize(value) {
        return String(value || "").trim().toLowerCase();
    }

    function findProductByRoute(value) {
        const text = normalize(value);

        for (const [key, product] of
            Object.entries(PRODUCTS)) {

            if (key === text) return key;

            const found = product.routes.some(route => {
                const normalizedRoute = normalize(route);

                return text === normalizedRoute ||
                    text.includes(normalizedRoute);
            });

            if (found) return key;
        }

        return null;
    }

    function detectProduct() {
        const params = new URLSearchParams(
            window.location.search
        );

        // Priority 1: Explicit product parameter
        const productParam = params.get("product");

        if (productParam) {
            return findProductByRoute(productParam);
        }

        // Priority 2: Source product folder
        const source = params.get("source");

        if (source) {
            return findProductByRoute(source);
        }

        // Priority 3: Current page path
        const path = decodeURIComponent(
            window.location.pathname
        );

        const matchedPath = findProductByRoute(path);

        if (matchedPath) return matchedPath;

        // Priority 4: Referring page (when available)
        if (document.referrer) {
            try {
                const referrer = new URL(document.referrer);

                // Trust only pages on this website
                if (referrer.origin === window.location.origin) {
                    return findProductByRoute(
                        referrer.pathname
                    );
                }
            } catch (error) {
                console.warn("Invalid referrer URL");
            }
        }

        return null;
    }

    const CURRENT_PRODUCT = detectProduct();

    function updatePageHeading() {
        if (!CURRENT_PRODUCT) {
            pageTitle.textContent = "How-to Guides";
            pageDescription.textContent =
                "Select a product to view its guides.";
            return;
        }

        const product = PRODUCTS[CURRENT_PRODUCT];

        pageTitle.textContent =
            product.name + " How-to Guides";

        pageDescription.textContent =
            "Step-by-step tutorials, setup guides, " +
            "and product documentation.";
    }

    // =====================================
    // 5. GITHUB URL HELPERS
    // =====================================

    function encodePath(path) {
        return path
            .split("/")
            .map(encodeURIComponent)
            .join("/");
    }

    function getRawURL(path) {
        return (
            RAW + "/" +
            CONFIG.owner + "/" +
            CONFIG.repo + "/" +
            CONFIG.branch + "/" +
            encodePath(path)
        );
    }

    function getFallbackTitle(path) {
        return path
            .split("/")
            .pop()
            .replace(/\.html?$/i, "")
            .replace(/[-_]/g, " ")
            .trim();
    }

    function formatDate(value) {
        if (!value) return "Date unavailable";

        const date = new Date(value);

        if (Number.isNaN(date.getTime())) {
            return "Date unavailable";
        }

        return date.toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric"
        });
    }

    // =====================================
    // 6. ARTICLE METADATA EXTRACTION
    // =====================================

    function getMeta(doc, names) {
        const metas = doc.querySelectorAll("meta");

        for (const name of names) {
            for (const meta of metas) {
                if (
                    meta.getAttribute("name") === name ||
                    meta.getAttribute("property") === name
                ) {
                    const value = meta.getAttribute("content");

                    if (value) return value;
                }
            }
        }

        return "";
    }

    // Extract a balanced JSON object or JSON string
    // following an ArticleData assignment.
    function readJSONValue(source, start) {
        let i = start;

        while (/\s/.test(source[i] || "")) i++;

        const first = source[i];

        if (first !== "{" && first !== '"') {
            return null;
        }

        if (first === '"') {
            let end = i + 1;
            let escaped = false;

            for (; end < source.length; end++) {
                const c = source[end];

                if (escaped) {
                    escaped = false;
                } else if (c === "\\") {
                    escaped = true;
                } else if (c === '"') {
                    break;
                }
            }

            if (end >= source.length) return null;

            return source.slice(i, end + 1);
        }

        let depth = 0;
        let inString = false;
        let escaped = false;

        for (let end = i; end < source.length; end++) {
            const c = source[end];

            if (inString) {
                if (escaped) {
                    escaped = false;
                } else if (c === "\\") {
                    escaped = true;
                } else if (c === '"') {
                    inString = false;
                }
                continue;
            }

            if (c === '"') {
                inString = true;
            } else if (c === "{") {
                depth++;
            } else if (c === "}") {
                depth--;

                if (depth === 0) {
                    return source.slice(i, end + 1);
                }
            }
        }

        return null;
    }

    function extractArticleData(doc) {
        // Preferred: dedicated application/json metadata
        const jsonScript =
            doc.getElementById("article-data");

        if (jsonScript) {
            try {
                return JSON.parse(jsonScript.textContent);
            } catch (error) {
                console.warn("Invalid article-data JSON");
            }
        }

        // Fallback: inline ArticleData = {...}
        // or ArticleData = "{...}"
        const scripts = doc.querySelectorAll("script");

        for (const script of scripts) {
            if (script.src) continue;

            const text = script.textContent || "";

            const assignment =
                /\bArticleData\s*=\s*/g;

            let match;

            while ((match = assignment.exec(text))) {
                const rawValue = readJSONValue(
                    text,
                    assignment.lastIndex
                );

                if (!rawValue) continue;

                try {
                    let data = JSON.parse(rawValue);

                    // ArticleData may itself be a JSON string
                    if (typeof data === "string") {
                        data = JSON.parse(data);
                    }

                    if (data && typeof data === "object") {
                        return data;
                    }
                } catch (error) {
                    console.warn(
                        "ArticleData is not strict JSON"
                    );
                }
            }
        }

        return {};
    }

    function parseArticle(path, html) {
        const doc = new DOMParser().parseFromString(
            html,
            "text/html"
        );

        const data = extractArticleData(doc);

        const title =
            data.title ||
            data.metaTitle ||
            doc.querySelector("h1")?.textContent?.trim() ||
            doc.title ||
            getFallbackTitle(path);

        const date =
            data.updatedDate ||
            getMeta(doc, [
                "article:modified_time",
                "article:published_time",
                "date",
                "datePublished"
            ]) ||
            doc.querySelector("time[datetime]")
                ?.getAttribute("datetime") ||
            "";

        const readTime =
            parseInt(data.readTime, 10) || 5;

        const description =
            data.lede ||
            data.metaDescription ||
            getMeta(doc, ["description"]) ||
            "";

        return {
            path,
            html,
            title: String(title).trim(),
            date,
            readTime,
            description,
            category: data.badge || "How-to",
            product: data.product || "",
            sidebarApp: data.sidebarApp || "",
            crumbApp: data.crumbApp || ""
        };
    }

    // =====================================
    // 7. IDENTIFY ARTICLE PRODUCT
    // =====================================

    function identifyArticleProduct(article) {

        // Highest priority: Explicit product metadata
        if (article.product) {
            const explicit = findProductByRoute(
                article.product
            );

            if (explicit) return explicit;
        }

        // Next: sidebarApp / crumbApp metadata
        const metadata = [
            article.sidebarApp,
            article.crumbApp
        ].filter(Boolean).join(" ").toLowerCase();

        for (const [key, product] of
            Object.entries(PRODUCTS)) {

            if (product.articleNames.some(name =>
                metadata.includes(normalize(name))
            )) {
                return key;
            }
        }

        // Next: GitHub article folder path
        const path = normalize(article.path);

        for (const [key, product] of
            Object.entries(PRODUCTS)) {

            if (product.folders.some(folder =>
                path.startsWith(normalize(folder))
            )) {
                return key;
            }
        }

        // Last fallback: Article title
        const title = normalize(article.title);

        for (const [key, product] of
            Object.entries(PRODUCTS)) {

            if (product.articleNames.some(name =>
                title.includes(normalize(name))
            )) {
                return key;
            }
        }

        return null;
    }

    // =====================================
    // 8. CREATE ARTICLE CARDS
    // =====================================

    function createCard(article) {

        const card = document.createElement("article");
        card.className = "how-to-card";

        const category = document.createElement("span");
        category.className = "how-to-category";
        category.textContent = article.category;

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
        date.textContent = "📅 " + formatDate(article.date);

        const time = document.createElement("span");
        time.textContent =
            "◷ " + article.readTime + " min read";

        meta.append(date, time);

        const button = document.createElement("button");
        button.type = "button";
        button.className = "how-to-read";
        button.textContent = "Read Article →";

        button.addEventListener("click", function () {
            openArticle(article);
        });

        footer.append(meta, button);

        card.append(
            category,
            title,
            description,
            footer
        );

        return card;
    }

    // =====================================
    // 9. RENDER PRODUCT ARTICLES
    // =====================================

    function renderArticles() {
        const keyword = normalize(searchInput.value);

        const filtered = articles.filter(article => {
            const product = identifyArticleProduct(article);

            if (product !== CURRENT_PRODUCT) {
                return false;
            }

            const searchable = normalize([
                article.title,
                article.description,
                article.category
            ].join(" "));

            return searchable.includes(keyword);
        });

        container.replaceChildren();

        const fragment = document.createDocumentFragment();

        filtered.forEach(article => {
            fragment.appendChild(createCard(article));
        });

        container.appendChild(fragment);

        emptyMessage.hidden =
            loading || filtered.length !== 0;

        if (loading) {
            articleCount.textContent =
                filtered.length + " guides loaded...";
        } else {
            articleCount.textContent =
                filtered.length + " How-to Guides Found";
        }

        if (!loading && filtered.length === 0) {
            emptyDescription.textContent =
                keyword
                    ? "Try another search keyword."
                    : "No matching product articles found.";
        }
    }

    // =====================================
    // 10. ARTICLE POPUP
    // =====================================

    function openArticle(article) {
        lastFocus = document.activeElement;

        modalTitle.textContent = article.title;

        const doc = new DOMParser().parseFromString(
            article.html,
            "text/html"
        );

        // Resolve relative resources
        const directory = article.path.substring(
            0,
            article.path.lastIndexOf("/") + 1
        );

        const base = doc.createElement("base");
        base.href = getRawURL(directory);

        doc.querySelectorAll("base").forEach(
            element => element.remove()
        );

        doc.head.prepend(base);

        // Keep external HTML JavaScript disabled
        articleFrame.srcdoc =
            "<!DOCTYPE html>\n" +
            doc.documentElement.outerHTML;

        modal.hidden = false;
        document.body.style.overflow = "hidden";

        closeButton.focus();
    }

    function closeArticle() {
        modal.hidden = true;
        articleFrame.removeAttribute("srcdoc");

        document.body.style.overflow = "";

        if (lastFocus && lastFocus.isConnected) {
            lastFocus.focus();
        }
    }

    closeButton.addEventListener(
        "click",
        closeArticle
    );

    modal.addEventListener("click", function (event) {
        if (event.target === modal) {
            closeArticle();
        }
    });

    document.addEventListener("keydown", function (event) {
        if (event.key === "Escape" && !modal.hidden) {
            closeArticle();
        }

        // Keep focus inside the modal
        if (event.key === "Tab" && !modal.hidden) {
            event.preventDefault();
            closeButton.focus();
        }
    });

    searchInput.addEventListener(
        "input",
        renderArticles
    );

    // =====================================
    // 11. GITHUB ARTICLE LOADER
    // =====================================

    async function fetchArticle(file) {
        const response = await fetch(
            getRawURL(file.path)
        );

        if (!response.ok) {
            throw new Error(
                "Unable to fetch: " + file.path
            );
        }

        const html = await response.text();

        return parseArticle(file.path, html);
    }

    async function loadArticles() {

        if (!CURRENT_PRODUCT) {
            articleCount.textContent =
                "Product not identified.";

            emptyMessage.hidden = false;
            emptyDescription.textContent =
                "Open this page using ?product=helpdesk " +
                "or another configured product.";

            return;
        }

        loading = true;
        articles = [];
        failedCount = 0;

        articleCount.textContent =
            "Fetching " +
            PRODUCTS[CURRENT_PRODUCT].name +
            " guides...";

        try {
            const treeURL =
                `${API}/repos/${CONFIG.owner}/` +
                `${CONFIG.repo}/git/trees/` +
                `${CONFIG.branch}?recursive=1`;

            const response = await fetch(treeURL);

            if (!response.ok) {
                throw new Error(
                    "GitHub API returned " + response.status
                );
            }

            const data = await response.json();

            if (data.truncated) {
                throw new Error(
                    "GitHub returned an incomplete file tree."
                );
            }

            // All HTML files under GitHub main/
            const files = data.tree.filter(file =>
                file.type === "blob" &&
                file.path.startsWith(CONFIG.folder) &&
                /\.html?$/i.test(file.path)
            );

            const batchSize = CONFIG.batchSize;

            // Progressive article loading
            for (
                let i = 0;
                i < files.length;
                i += batchSize
            ) {
                const batch = files.slice(
                    i,
                    i + batchSize
                );

                const results = await Promise.allSettled(
                    batch.map(fetchArticle)
                );

                results.forEach(result => {
                    if (result.status === "fulfilled") {
                        articles.push(result.value);
                    } else {
                        failedCount++;
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

            if (failedCount) {
                articleCount.textContent +=
                    ` (${failedCount} files failed to load)`;
            }

            console.log(
                "Current product:", CURRENT_PRODUCT,
                "HTML files:", files.length,
                "Matching articles:",
                articles.filter(article =>
                    identifyArticleProduct(article) ===
                    CURRENT_PRODUCT
                ).length
            );

        } catch (error) {
            loading = false;

            console.error(
                "How-to Guide loading error:",
                error
            );

            articleCount.textContent =
                "Unable to load guides: " + error.message;

            emptyMessage.hidden = false;
            emptyDescription.textContent =
                "Check GitHub access and try again.";
        }
    }

    // =====================================
    // 12. INITIALIZE
    // =====================================

    updatePageHeading();
    loadArticles();

})();
