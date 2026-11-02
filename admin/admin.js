// Admin Panel JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Navigation
    const navLinks = document.querySelectorAll('.admin-nav__link');
    const sections = document.querySelectorAll('.admin-section');
    const sectionTitle = document.getElementById('sectionTitle');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const sectionId = this.getAttribute('data-section');
            
            // Update nav
            navLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
            
            // Update sections
            sections.forEach(s => s.classList.remove('active'));
            document.getElementById(sectionId).classList.add('active');
            
            // Update title
            sectionTitle.textContent = this.textContent.replace(/📊|⚙️|📝|📄|🔧|📋|🔍|💰|📢|💻|📈|🧭|🎨|⚖️|💾/g, '').trim();
        });
    });
    
    // Load saved settings
    loadSettings();
});

// Settings
function loadSettings() {
    const settings = JSON.parse(localStorage.getItem('solodesk-admin-settings') || '{}');
    
    document.getElementById('siteName').value = settings.siteName || 'SoloDesk';
    document.getElementById('siteTagline').value = settings.siteTagline || 'Free Freelance Business Tools';
    document.getElementById('siteUrl').value = settings.siteUrl || 'https://solodesk.com';
    
    const adsense = settings.adsense || {};
    document.getElementById('adsEnabled').checked = adsense.enabled || false;
    document.getElementById('adsPublisher').value = adsense.publisher || '';
    document.getElementById('adsVerify').value = adsense.verify || '';
    document.getElementById('autoAds').checked = adsense.autoAds || false;
    document.getElementById('adHeader').value = adsense.adHeader || '';
    document.getElementById('adBelowNav').value = adsense.adBelowNav || '';
    document.getElementById('adArticleIntro').value = adsense.adArticleIntro || '';
    document.getElementById('adInArticle').value = adsense.adInArticle || '';
    document.getElementById('adSidebar').value = adsense.adSidebar || '';
    document.getElementById('adFooter').value = adsense.adFooter || '';
    
    const scripts = settings.scripts || {};
    document.getElementById('headCustom').value = scripts.headCustom || '';
    document.getElementById('gaCode').value = scripts.gaCode || '';
    document.getElementById('gtmHead').value = scripts.gtmHead || '';
    document.getElementById('gscVerify').value = scripts.gscVerify || '';
    document.getElementById('bodyStart').value = scripts.bodyStart || '';
    document.getElementById('gtmBody').value = scripts.gtmBody || '';
    document.getElementById('footerScripts').value = scripts.footerScripts || '';
}

function saveSettings() {
    const settings = JSON.parse(localStorage.getItem('solodesk-admin-settings') || '{}');
    settings.siteName = document.getElementById('siteName').value;
    settings.siteTagline = document.getElementById('siteTagline').value;
    settings.siteUrl = document.getElementById('siteUrl').value;
    localStorage.setItem('solodesk-admin-settings', JSON.stringify(settings));
    alert('Settings saved to localStorage!');
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

function exportAllSettings() {
    const settings = localStorage.getItem('solodesk-admin-settings') || '{}';
    const blob = new Blob([settings], { type: 'application/json' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'solodesk-settings.json';
    a.click();
    alert('Settings exported! Remember to update config/site-config.json and commit to GitHub.');
}

function downloadConfigTemplate() {
    const template = {
        site: {
            name: "SoloDesk",
            tagline: "Free Freelance Business Tools",
            url: "https://solodesk.com",
            language: "en"
        },
        adsense: {
            enabled: false,
            publisher: "",
            verify: "",
            autoAds: false,
            placements: {
                header: "",
                belowNav: "",
                articleIntro: "",
                inArticle: "",
                sidebar: "",
                beforeRelated: "",
                footer: ""
            }
        },
        scripts: {
            head: "",
            bodyStart: "",
            footer: "",
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
        }
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
            localStorage.setItem('solodesk-admin-settings', JSON.stringify(imported));
            loadSettings();
            alert('Settings imported successfully!');
        } catch (err) {
            alert('Error importing settings: Invalid JSON');
        }
    };
    reader.readAsText(file);
}
