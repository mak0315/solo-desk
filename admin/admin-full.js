// Enhanced Admin Panel JavaScript
let articles = JSON.parse(localStorage.getItem('solodesk-articles') || '[]');
let templates = JSON.parse(localStorage.getItem('solodesk-templates') || '[]');

document.addEventListener('DOMContentLoaded', function() {
    // Navigation
    const navLinks = document.querySelectorAll('.admin-nav__link');
    const sections = document.querySelectorAll('.admin-section');
    const sectionTitle = document.getElementById('sectionTitle');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const sectionId = this.getAttribute('data-section');
            
            navLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
            
            sections.forEach(s => s.classList.remove('active'));
            document.getElementById(sectionId).classList.add('active');
            
            sectionTitle.textContent = this.textContent.replace(/📊|⚙️|📝|📄|🔧|📋|🔍|💰|📢|💻|📈|🧭|🎨|⚖️|💾/g, '').trim();
            
            if (sectionId === 'articles') renderArticles();
            if (sectionId === 'templates') renderTemplates();
            if (sectionId === 'dashboard') updateDashboardStats();
        });
    });
    
    loadSettings();
    renderArticles();
    renderTemplates();
    updateDashboardStats();
});

function updateDashboardStats() {
    document.getElementById('statArticles').textContent = articles.length;
}

// Settings
function loadSettings() {
    const settings = JSON.parse(localStorage.getItem('solodesk-admin-settings') || '{}');
    
    if (document.getElementById('siteName')) document.getElementById('siteName').value = settings.siteName || 'SoloDesk';
    if (document.getElementById('siteTagline')) document.getElementById('siteTagline').value = settings.siteTagline || 'Free Freelance Business Tools';
    if (document.getElementById('siteUrl')) document.getElementById('siteUrl').value = settings.siteUrl || 'https://mak0315.github.io/solo-desk/';
    
    const adsense = settings.adsense || {};
    if (document.getElementById('adsEnabled')) document.getElementById('adsEnabled').checked = adsense.enabled || false;
    if (document.getElementById('adsPublisher')) document.getElementById('adsPublisher').value = adsense.publisher || '';
    if (document.getElementById('adsVerify')) document.getElementById('adsVerify').value = adsense.verify || '';
    if (document.getElementById('autoAds')) document.getElementById('autoAds').checked = adsense.autoAds || false;
    if (document.getElementById('adHeader')) document.getElementById('adHeader').value = adsense.adHeader || '';
    if (document.getElementById('adBelowNav')) document.getElementById('adBelowNav').value = adsense.adBelowNav || '';
    if (document.getElementById('adArticleIntro')) document.getElementById('adArticleIntro').value = adsense.adArticleIntro || '';
    if (document.getElementById('adInArticle')) document.getElementById('adInArticle').value = adsense.adInArticle || '';
    if (document.getElementById('adSidebar')) document.getElementById('adSidebar').value = adsense.adSidebar || '';
    if (document.getElementById('adFooter')) document.getElementById('adFooter').value = adsense.adFooter || '';
    
    const scripts = settings.scripts || {};
    if (document.getElementById('headCustom')) document.getElementById('headCustom').value = scripts.headCustom || '';
    if (document.getElementById('gaCode')) document.getElementById('gaCode').value = scripts.gaCode || '';
    if (document.getElementById('gtmHead')) document.getElementById('gtmHead').value = scripts.gtmHead || '';
    if (document.getElementById('gscVerify')) document.getElementById('gscVerify').value = scripts.gscVerify || '';
    if (document.getElementById('bodyStart')) document.getElementById('bodyStart').value = scripts.bodyStart || '';
    if (document.getElementById('gtmBody')) document.getElementById('gtmBody').value = scripts.gtmBody || '';
    if (document.getElementById('footerScripts')) document.getElementById('footerScripts').value = scripts.footerScripts || '';
}

function saveSettings() {
    const settings = JSON.parse(localStorage.getItem('solodesk-admin-settings') || '{}');
    settings.siteName = document.getElementById('siteName').value;
    settings.siteTagline = document.getElementById('siteTagline').value;
    settings.siteUrl = document.getElementById('siteUrl').value;
    localStorage.setItem('solodesk-admin-settings', JSON.stringify(settings));
    alert('Website settings saved to localStorage!');
}

function saveAdSense() {
    const settings = JSON.parse(localStorage.getItem('solodesk-admin-settings') || '{}');
    settings.adsense = {
        enabled: document.getElementById('adsEnabled').checked,
        publisher: document.getElementById('adsPublisher').value,
        verify: document.getElementById('adsVerify').value,
        autoAds: document.getElementById('autoAds').checked,
        adHeader: document.getElementById('adHeader').value,
        adBelowNav: document.getElementById('adBelowNav').value,
        adArticleIntro: document.getElementById('adArticleIntro').value,
        adInArticle: document.getElementById('adInArticle').value,
        adSidebar: document.getElementById('adSidebar').value,
        adFooter: document.getElementById('adFooter').value
    };
    localStorage.setItem('solodesk-admin-settings', JSON.stringify(settings));
    alert('AdSense settings saved to localStorage!');
}

function saveScripts() {
    const settings = JSON.parse(localStorage.getItem('solodesk-admin-settings') || '{}');
    settings.scripts = {
        headCustom: document.getElementById('headCustom').value,
        gaCode: document.getElementById('gaCode').value,
        gtmHead: document.getElementById('gtmHead').value,
        gscVerify: document.getElementById('gscVerify').value,
        bodyStart: document.getElementById('bodyStart').value,
        gtmBody: document.getElementById('gtmBody').value,
        footerScripts: document.getElementById('footerScripts').value
    };
    localStorage.setItem('solodesk-admin-settings', JSON.stringify(settings));
    alert('Scripts saved to localStorage!');
}

// Articles Management
function showArticleForm() {
    document.getElementById('articleForm').style.display = 'block';
    document.getElementById('articleFormTitle').textContent = 'Add New Article';
    document.getElementById('articleId').value = '';
    document.getElementById('articleTitle').value = '';
    document.getElementById('articleSlug').value = '';
    document.getElementById('articleDesc').value = '';
    document.getElementById('articleContent').value = '';
    document.getElementById('articleCategory').value = '';
    document.getElementById('articleTags').value = '';
    document.getElementById('articleAuthor').value = 'SoloDesk';
    document.getElementById('articleSeoTitle').value = '';
    document.getElementById('articleSeoDesc').value = '';
    document.getElementById('articlePublished').checked = false;
    document.getElementById('articleForm').scrollIntoView({ behavior: 'smooth' });
}

function hideArticleForm() {
    document.getElementById('articleForm').style.display = 'none';
}

function generateSlug() {
    const title = document.getElementById('articleTitle').value;
    const slug = title.toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
    document.getElementById('articleSlug').value = slug;
}

function saveArticle() {
    const id = document.getElementById('articleId').value || Date.now().toString();
    const article = {
        id: id,
        title: document.getElementById('articleTitle').value,
        slug: document.getElementById('articleSlug').value,
        description: document.getElementById('articleDesc').value,
        content: document.getElementById('articleContent').value,
        category: document.getElementById('articleCategory').value,
        tags: document.getElementById('articleTags').value.split(',').map(t => t.trim()).filter(t => t),
        author: document.getElementById('articleAuthor').value,
        seoTitle: document.getElementById('articleSeoTitle').value,
        seoDescription: document.getElementById('articleSeoDesc').value,
        published: document.getElementById('articlePublished').checked,
        date: new Date().toISOString()
    };
    
    if (!article.title || !article.slug) {
        alert('Title and Slug are required!');
        return;
    }
    
    const index = articles.findIndex(a => a.id === id);
    if (index >= 0) {
        articles[index] = article;
    } else {
        articles.push(article);
    }
    
    localStorage.setItem('solodesk-articles', JSON.stringify(articles));
    alert('Article saved to localStorage!');
    hideArticleForm();
    renderArticles();
    updateDashboardStats();
}

function editArticle(id) {
    const article = articles.find(a => a.id === id);
    if (!article) return;
    
    document.getElementById('articleForm').style.display = 'block';
    document.getElementById('articleFormTitle').textContent = 'Edit Article';
    document.getElementById('articleId').value = article.id;
    document.getElementById('articleTitle').value = article.title;
    document.getElementById('articleSlug').value = article.slug;
    document.getElementById('articleDesc').value = article.description || '';
    document.getElementById('articleContent').value = article.content || '';
    document.getElementById('articleCategory').value = article.category || '';
    document.getElementById('articleTags').value = (article.tags || []).join(', ');
    document.getElementById('articleAuthor').value = article.author || 'SoloDesk';
    document.getElementById('articleSeoTitle').value = article.seoTitle || '';
    document.getElementById('articleSeoDesc').value = article.seoDescription || '';
    document.getElementById('articlePublished').checked = article.published || false;
    document.getElementById('articleForm').scrollIntoView({ behavior: 'smooth' });
}

function deleteArticle(id) {
    if (confirm('Delete this article?')) {
        articles = articles.filter(a => a.id !== id);
        localStorage.setItem('solodesk-articles', JSON.stringify(articles));
        renderArticles();
        updateDashboardStats();
    }
}

function renderArticles() {
    const list = document.getElementById('articlesList');
    if (!list) return;
    
    if (articles.length === 0) {
        list.innerHTML = '<p style="color: var(--text-secondary); text-align: center; padding: 2rem;">No articles yet. Click "Add New Article" to create one.</p>';
        return;
    }
    
    list.innerHTML = articles.map(article => `
        <div class="article-item" style="padding: 1rem; border: 1px solid var(--admin-border); border-radius: 0.5rem; margin-bottom: 0.75rem; display: flex; justify-content: space-between; align-items: center;">
            <div>
                <strong>${article.title}</strong> <span style="color: ${article.published ? 'var(--admin-success)' : 'var(--admin-warning)'};">[${article.published ? 'Published' : 'Draft'}]</span><br>
                <small style="color: var(--admin-text-light);">/${article.slug} • ${article.category || 'Uncategorized'}</small>
            </div>
            <div style="display: flex; gap: 0.5rem;">
                <button class="btn" style="padding: 0.375rem 0.75rem;" onclick="editArticle('${article.id}')">Edit</button>
                <button class="btn" style="padding: 0.375rem 0.75rem;" onclick="exportArticle('${article.id}')">Export JSON</button>
                <button class="btn" style="padding: 0.375rem 0.75rem; color: var(--admin-danger);" onclick="deleteArticle('${article.id}')">Delete</button>
            </div>
        </div>
    `).join('');
}

function exportArticle(id) {
    const article = articles.find(a => a.id === id);
    if (!article) return;
    const blob = new Blob([JSON.stringify(article, null, 2)], { type: 'application/json' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${article.slug}.json`;
    a.click();
}

function exportAllArticles() {
    if (articles.length === 0) {
        alert('No articles to export');
        return;
    }
    const blob = new Blob([JSON.stringify(articles, null, 2)], { type: 'application/json' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'articles.json';
    a.click();
    alert('All articles exported! Add them to content/articles/ folder.');
}

// Templates
function showTemplateForm() {
    document.getElementById('templateForm').style.display = 'block';
    document.getElementById('templateFormTitle').textContent = 'Add New Template';
    document.getElementById('templateId').value = '';
    document.getElementById('templateTitle').value = '';
    document.getElementById('templateDesc').value = '';
    document.getElementById('templateFile').value = '';
    document.getElementById('templateForm').scrollIntoView({ behavior: 'smooth' });
}

function hideTemplateForm() {
    document.getElementById('templateForm').style.display = 'none';
}

function saveTemplate() {
    const id = document.getElementById('templateId').value || Date.now().toString();
    const template = {
        id: id,
        title: document.getElementById('templateTitle').value,
        description: document.getElementById('templateDesc').value,
        file: document.getElementById('templateFile').value,
        date: new Date().toISOString()
    };
    
    if (!template.title) {
        alert('Title is required!');
        return;
    }
    
    const index = templates.findIndex(t => t.id === id);
    if (index >= 0) {
        templates[index] = template;
    } else {
        templates.push(template);
    }
    
    localStorage.setItem('solodesk-templates', JSON.stringify(templates));
    alert('Template saved to localStorage!');
    hideTemplateForm();
    renderTemplates();
}

function renderTemplates() {
    const list = document.getElementById('templatesList');
    if (!list) return;
    
    if (templates.length === 0) {
        list.innerHTML = '<p style="color: var(--text-secondary); text-align: center; padding: 2rem;">No templates yet.</p>';
        return;
    }
    
    list.innerHTML = templates.map(template => `
        <div class="template-item" style="padding: 1rem; border: 1px solid var(--admin-border); border-radius: 0.5rem; margin-bottom: 0.75rem; display: flex; justify-content: space-between; align-items: center;">
            <div>
                <strong>${template.title}</strong><br>
                <small style="color: var(--admin-text-light);">${template.description || ''}</small>
            </div>
            <button class="btn" style="padding: 0.375rem 0.75rem; color: var(--admin-danger);" onclick="deleteTemplate('${template.id}')">Delete</button>
        </div>
    `).join('');
}

function deleteTemplate(id) {
    if (confirm('Delete this template?')) {
        templates = templates.filter(t => t.id !== id);
        localStorage.setItem('solodesk-templates', JSON.stringify(templates));
        renderTemplates();
    }
}

// Export/Import
function exportAllSettings() {
    const settings = localStorage.getItem('solodesk-admin-settings') || '{}';
    const allData = {
        settings: JSON.parse(settings),
        articles: articles,
        templates: templates
    };
    const blob = new Blob([JSON.stringify(allData, null, 2)], { type: 'application/json' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'solodesk-complete-export.json';
    a.click();
    alert('All data exported! For website config, update config/site-config.json and commit to GitHub.');
}

function downloadConfigTemplate() {
    const template = {
        site: {
            name: "SoloDesk",
            tagline: "Free Freelance Business Tools",
            url: "https://mak0315.github.io/solo-desk/",
            language: "en",
            description: "Professional toolkit for freelancers with free online tools, calculators, generators and resources."
        },
        adsense: {
            enabled: false,
            publisher: "",
            verify: "",
            autoAds: false,
            placements: {
                header: "", belowNav: "", articleIntro: "", inArticle: "", sidebar: "", beforeRelated: "", footer: ""
            },
            mobileVisible: true,
            desktopVisible: true
        },
        scripts: {
            head: "", bodyStart: "", footer: "",
            analytics: {
                googleAnalytics: "",
                googleTagManager: { head: "", body: "" },
                googleSearchConsole: "",
                pinterest: ""
            }
        },
        seo: {
            defaultTitle: "SoloDesk - Free Freelance Business Tools",
            defaultDescription: "Professional toolkit for freelancers",
            ogImage: ""
        },
        theme: { defaultMode: "light", allowDarkMode: true }
    };
    const blob = new Blob([JSON.stringify(template, null, 2)], { type: 'application/json' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'site-config-template.json';
    a.click();
}

function importSettings(event) {
    const file = event.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = function(e) {
        try {
            const imported = JSON.parse(e.target.result);
            if (imported.settings) {
                localStorage.setItem('solodesk-admin-settings', JSON.stringify(imported.settings));
            } else {
                localStorage.setItem('solodesk-admin-settings', JSON.stringify(imported));
            }
            if (imported.articles) {
                articles = imported.articles;
                localStorage.setItem('solodesk-articles', JSON.stringify(articles));
                renderArticles();
            }
            if (imported.templates) {
                templates = imported.templates;
                localStorage.setItem('solodesk-templates', JSON.stringify(templates));
                renderTemplates();
            }
            loadSettings();
            updateDashboardStats();
            alert('Data imported successfully!');
        } catch (err) {
            alert('Error importing: Invalid JSON');
        }
    };
    reader.readAsText(file);
}
