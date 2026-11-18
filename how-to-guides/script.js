
// ==========================================
// APPS365 - HOW TO GUIDES
// GITHUB AUTOMATIC ARTICLE LOADER
// ==========================================

(function () {
    "use strict";

    // GitHub Configuration
    const CONFIG = {
        owner: "vikascubiclogics",
        repo: "KBPortal",
        branch: "main",
        folder: "main/",
        batchSize: 4
    };

    const API = "https://api.github.com";
    const RAW = "https://raw.githubusercontent.com";

    // HTML Elements
    const container = document.getElementById(
        "articlesContainer"
    );

    const searchInput = document.getElementById(
        "articleSearch"
    );

    const articleCount = document.getElementById(
        "articleCount"
    );

    const emptyMessage = document.getElementById(
        "emptyMessage"
    );

    const modal = document.getElementById(
        "articleModal"
    );

    const modalTitle = document.getElementById(
        "modalTitle"
    );

    const articleFrame = document.getElementById(
        "articleFrame"
    );

    const closeModalButton = document.getElementById(
        "closeModal"
    );

    let articles = [];
    let lastFocusedElement = null;

    // Encode file paths safely
    function encodePath(path) {
        return path
            .split("/")
            .map(encodeURIComponent)
            .join("/");
    }

    // GitHub RAW file URL
    function getRawURL(path) {
        return (
            RAW + "/" +
            CONFIG.owner + "/" +
            CONFIG.repo + "/" +
            CONFIG.branch + "/" +
            encodePath(path)
        );
    }

    // Convert file name to readable title
    function getFallbackTitle(path) {
        return path
            .split("/")
            .pop()
            .replace(/\.html?$/i, "")
            .replace(/[-_]/g, " ")
            .trim();
    }

    // Format Date
    function formatDate(value) {
        if (!value) return "Date unavailable";

        const date = new Date(value);

        if (isNaN(date.getTime())) {
            return "Date unavailable";
        }

        return date.toLocaleDateString("en-US", {
            day: "numeric",
            month: "short",
            year: "numeric"
        });
    }

    // Get Meta Tag Content
    function getMetaContent(doc, names) {
        const metaTags = doc.querySelectorAll("meta");

        for (const name of names) {
            for (const meta of metaTags) {
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

    // Extract Article Metadata
    function parseArticle(path, html) {
        const parser = new DOMParser();

        const doc = parser.parseFromString(
            html,
            "text/html"
        );

        // Article Title
        const title =
            doc.querySelector("h1")?.textContent?.trim() ||
            doc.querySelector("title")?.textContent?.trim() ||
            getFallbackTitle(path);

        // Published Date
        const date =
            getMetaContent(doc, [
                "article:published_time",
                "datePublished",
                "date",
                "pubdate",
                "article:modified_time"
            ]) ||
            doc.querySelector("time[datetime]")
                ?.getAttribute("datetime") ||
            "";

        // Article Main Content
        const content =
            doc.querySelector("article") ||
            doc.querySelector("main") ||
            doc.body;

        const copy = content.cloneNode(true);

        // Remove non-article content
        copy.querySelectorAll(
            "script, style, nav, footer, header, noscript"
        ).forEach(element => element.remove());

        // Word Count
        const text = copy.textContent || "";

        const wordCount = text
            .trim()
            .split(/\s+/)
            .filter(Boolean)
            .length;

        // Reading Time: 225 Words Per Minute
        const readTime = Math.max(
            1,
            Math.ceil(wordCount / 225)
        );

        // Category from folder name
        const relativePath = path.substring(
            CONFIG.folder.length
        );

        const folders = relativePath.split("/");

        const category = folders.length > 1
            ? folders.slice(0, -1).join(" / ")
            : "How to Guide";

        return {
            title,
            date,
            readTime,
            category,
            path,
            html
        };
    }

    // Create Individual Article Card
    function createArticleCard(article) {

        const card = document.createElement("article");
        card.className = "how-to-card";

        // Category
        const category = document.createElement("span");
        category.className = "how-to-category";
        category.textContent = article.category;

        // Title
        const heading = document.createElement("h3");
        heading.textContent = article.title;

        // Meta Container
        const meta = document.createElement("div");
        meta.className = "how-to-meta";

        const dateSpan = document.createElement("span");
        dateSpan.textContent =
            "📅 " + formatDate(article.date);

        const timeSpan = document.createElement("span");
        timeSpan.textContent =
            "◷ " + article.readTime + " min read";

        meta.append(dateSpan, timeSpan);

        // Read Article Button
        const readButton = document.createElement("button");

        readButton.type = "button";
        readButton.className = "how-to-read";
        readButton.textContent = "Read Article →";

        readButton.addEventListener("click", function () {
            openArticle(article);
        });

        card.append(
            category,
            heading,
            meta,
            readButton
        );

        return card;
    }

    // Render Article Cards
    function renderArticles() {

        const keyword = searchInput.value
            .trim()
            .toLowerCase();

        const filtered = articles.filter(article => {
            const searchable = (
                article.title + " " + article.category
            ).toLowerCase();

            return searchable.includes(keyword);
        });

        container.replaceChildren();

        const fragment = document.createDocumentFragment();

        filtered.forEach(article => {
            fragment.appendChild(
                createArticleCard(article)
            );
        });

        container.appendChild(fragment);

        emptyMessage.hidden = filtered.length !== 0;

        articleCount.textContent =
            filtered.length + " How to Guide(s) Found";
    }

    // Open Article Popup
    function openArticle(article) {

        lastFocusedElement = document.activeElement;
        modalTitle.textContent = article.title;

        const doc = new DOMParser().parseFromString(
            article.html,
            "text/html"
        );

        // Resolve relative image and CSS file URLs
        const directory = article.path.substring(
            0,
            article.path.lastIndexOf("/") + 1
        );

        const base = doc.createElement("base");
        base.href = getRawURL(directory);

        // Replace existing base
        doc.querySelectorAll("base").forEach(el => el.remove());
        doc.head.prepend(base);

        // Render HTML in isolated iframe
        // Scripts remain disabled by sandbox=""
        articleFrame.srcdoc =
            "<!DOCTYPE html>\n" +
            doc.documentElement.outerHTML;

        modal.hidden = false;
        document.body.style.overflow = "hidden";

        closeModalButton.focus();
    }

    // Close Article Popup
    function closeArticle() {
        modal.hidden = true;

        articleFrame.removeAttribute("srcdoc");
        document.body.style.overflow = "";

        if (lastFocusedElement) {
            lastFocusedElement.focus();
        }
    }

    closeModalButton.addEventListener(
        "click",
        closeArticle
    );

    modal.addEventListener("click", function (event) {
        if (event.target === modal) {
            closeArticle();
        }
    });

    document.addEventListener("keydown", function (event) {
        if (
            event.key === "Escape" &&
            !modal.hidden
        ) {
            closeArticle();
        }
    });

    // Search Articles
    searchInput.addEventListener(
        "input",
        renderArticles
    );

    // Fetch One Article
    async function fetchArticle(file) {

        const response = await fetch(
            getRawURL(file.path)
        );

        if (!response.ok) {
            throw new Error(
                "Unable to fetch " + file.path
            );
        }

        const html = await response.text();

        return parseArticle(
            file.path,
            html
        );
    }

    // Main GitHub Loader
    async function loadArticles() {

        articleCount.textContent =
            "Fetching articles from GitHub...";

        try {

            // GitHub Repository File Tree
            const treeURL =
                API + "/repos/" +
                CONFIG.owner + "/" +
                CONFIG.repo +
                "/git/trees/" +
                CONFIG.branch +
                "?recursive=1";

            const response = await fetch(treeURL);

            if (!response.ok) {
                throw new Error(
                    "GitHub API returned " + response.status
                );
            }

            const data = await response.json();

            if (data.truncated) {
                throw new Error(
                    "Repository file list is incomplete."
                );
            }

            // Select HTML files inside main folder
            const htmlFiles = data.tree.filter(file =>
                file.type === "blob" &&
                file.path.startsWith(CONFIG.folder) &&
                /\.html?$/i.test(file.path)
            );

            if (htmlFiles.length === 0) {
                articles = [];
                renderArticles();

                articleCount.textContent =
                    "No HTML files found in main folder.";

                return;
            }

            articles = [];

            // Fetch in Small Batches
            const batchSize = CONFIG.batchSize;
            let failed = 0;

            for (
                let i = 0;
                i < htmlFiles.length;
                i += batchSize
            ) {

                const batch = htmlFiles.slice(
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
                        failed++;
                        console.warn(
                            "Article loading failed:",
                            result.reason
                        );
                    }

                });

                // Latest dated articles first
                articles.sort((a, b) =>
                    (Date.parse(b.date) || 0) -
                    (Date.parse(a.date) || 0)
                );

                // Display cards progressively
                renderArticles();

                articleCount.textContent =
                    articles.length +
                    " of " +
                    htmlFiles.length +
                    " Guides Loaded";
            }

            renderArticles();

            if (failed > 0) {
                articleCount.textContent +=
                    " (" + failed + " failed to load)";
            }

        } catch (error) {

            console.error(
                "Knowledge Base Error:",
                error
            );

            articleCount.textContent =
                "Unable to load guides: " + error.message;
        }
    }

    // Initialize
    loadArticles();

})();
