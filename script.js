/**
 * WeatherVibe — Modern Real-Time Weather Dashboard
 * Bilingual (English & Nepali), Accessible, and Responsive
 * Features: Vertical Navigation Sidebar, Hourly & 5-Day Forecast,
 *           Rotating Compass, Magnus-Tetens Dew Point, Dynamic Atmospheres.
 */

const API_KEY = "ede91656aa2969830415f89e3200b960";

// --- DOM ELEMENTS ---
// Header & Controls
const searchForm = document.getElementById("searchForm");
const searchBtn = document.getElementById("searchBtn");
const locationBtn = document.getElementById("locationBtn");
const cityInput = document.getElementById("cityInput");
const clearInputBtn = document.getElementById("clearInputBtn");
const themeBtn = document.getElementById("themeBtn");
const languageSelect = document.getElementById("languageSelect");
const alertBanner = document.getElementById("alertBanner");
const messageEl = document.getElementById("message");
const closeAlertBtn = document.getElementById("closeAlertBtn");

// Sidebar Navigation
const navBtns = document.querySelectorAll(".nav-btn");
const navTextCurrent = document.getElementById("navTextCurrent");
const navTextHourly = document.getElementById("navTextHourly");
const navTextDetails = document.getElementById("navTextDetails");
const navTextMaps = document.getElementById("navTextMaps");
const navTextMonthly = document.getElementById("navTextMonthly");
const navTextTrends = document.getElementById("navTextTrends");
const scrollTopBtn = document.getElementById("scrollTopBtn");
const refreshWeatherBtn = document.getElementById("refreshWeatherBtn");

// Navigation View Modal
const navViewModal = document.getElementById("navViewModal");
const navModalCloseBtn = document.getElementById("navModalCloseBtn");
const navModalBackdrop = document.getElementById("navModalBackdrop");
const navModalTitle = document.getElementById("navModalTitle");
const navModalSubtitle = document.getElementById("navModalSubtitle");
const navModalBody = document.getElementById("navModalBody");
const navModalIconBadge = document.getElementById("navModalIconBadge");

// Hero Current Weather Elements
const currentWeatherCard = document.getElementById("currentWeatherCard");
const cityNameEl = document.getElementById("cityName");
const currentDateTimeEl = document.getElementById("currentDateTime");
const conditionBadgeEl = document.getElementById("conditionBadge");
const badgeConditionTextEl = document.getElementById("badgeConditionText");
const temperatureEl = document.getElementById("temperature");
const descriptionEl = document.getElementById("description");
const heroFeelsLikeEl = document.getElementById("heroFeelsLike");
const heroHighLowEl = document.getElementById("heroHighLow");
const weatherIconWrapper = document.getElementById("weatherIconWrapper");

// Forecast Containers
const hourlyContainer = document.getElementById("hourlyContainer");
const dailyContainer = document.getElementById("dailyContainer");

// Detailed Metrics Elements
const humidityEl = document.getElementById("humidity");
const humidityQualityEl = document.getElementById("humidityQuality");
const windEl = document.getElementById("wind");
const windDirectionEl = document.getElementById("windDirection");
const windDegreeEl = document.getElementById("windDegree");
const compassNeedleEl = document.getElementById("compassNeedle");
const feelsLikeEl = document.getElementById("feelsLike");
const feelsLikeDescEl = document.getElementById("feelsLikeDesc");
const dewPointEl = document.getElementById("dewPoint");
const dewPointDescEl = document.getElementById("dewPointDesc");
const visibilityEl = document.getElementById("visibility");
const visibilityDescEl = document.getElementById("visibilityDesc");
const pressureEl = document.getElementById("pressure");
const pressureDescEl = document.getElementById("pressureDesc");
const sunriseEl = document.getElementById("sunrise");
const sunriseSubtextEl = document.getElementById("sunriseSubtext");
const sunsetEl = document.getElementById("sunset");
const sunsetSubtextEl = document.getElementById("sunsetSubtext");

// Section Headings & Static Labels
const appTitleEl = document.getElementById("appTitle");
const appSubtitleEl = document.getElementById("appSubtitle");
const locationTooltipEl = document.getElementById("locationTooltip");
const hourlyHeadingEl = document.getElementById("hourlyHeading");
const hourlySubtitleEl = document.getElementById("hourlySubtitle");
const dailyHeadingEl = document.getElementById("dailyHeading");
const dailySubtitleEl = document.getElementById("dailySubtitle");
const detailsHeadingEl = document.getElementById("detailsHeading");
const detailsSubtitleEl = document.getElementById("detailsSubtitle");

const humidityLabelEl = document.getElementById("humidityLabel");
const windLabelEl = document.getElementById("windLabel");
const feelsLikeLabelEl = document.getElementById("feelsLikeLabel");
const dewPointLabelEl = document.getElementById("dewPointLabel");
const visibilityLabelEl = document.getElementById("visibilityLabel");
const pressureLabelEl = document.getElementById("pressureLabel");
const sunriseLabelEl = document.getElementById("sunriseLabel");
const sunsetLabelEl = document.getElementById("sunsetLabel");
const footerTextEl = document.getElementById("footerText");
const footerPoweredEl = document.getElementById("footerPowered");

// Trend Chart Elements
const trendsSectionEl = document.getElementById("trendsSection");
const trendsHeadingEl = document.getElementById("trendsHeading");
const trendsSubtitleEl = document.getElementById("trendsSubtitle");
const legendHighTextEl = document.getElementById("legendHighText");
const legendLowTextEl = document.getElementById("legendLowText");

// --- APPLICATION STATE ---
let currentLanguage = localStorage.getItem("weatherVibe_lang") || "en";
let currentWeatherData = null;
let currentForecastData = null;
let isLoading = false;
let activeNav = "trends"; // Default active menu item as requested
let forecastChartInstance = null; // Chart.js instance manager

// --- TRANSLATION DICTIONARY ---
const I18N = {
    en: {
        appTitle: "WeatherVibe",
        appSubtitle: "Real-Time Weather Information",
        searchPlaceholder: "Search for a city (e.g. Kathmandu, London)...",
        searchBtn: "Search",
        locationTooltip: "Use my location",
        // Sidebar Navigation
        navCurrent: "Current",
        navHourly: "Hourly",
        navDetails: "Details",
        navMaps: "Maps",
        navMonthly: "Monthly",
        navTrends: "Trends",
        backToTop: "Back to Top",
        refresh: "Refresh Weather",
        // Section Titles
        hourlyTitle: "Hourly Forecast",
        hourlySubtitle: "Next 24 Hours",
        dailyTitle: "5-Day Forecast",
        dailySubtitle: "Daily Outlook & Rainfall",
        detailsTitle: "Weather Details",
        detailsSubtitle: "Atmospheric Metrics",
        humidity: "Humidity",
        wind: "Wind Velocity",
        feelsLike: "Feels Like",
        dewPoint: "Dew Point",
        visibility: "Visibility",
        pressure: "Pressure",
        sunrise: "Sunrise",
        sunset: "Sunset",
        footer: "WeatherVibe © 2026 • Real-Time Weather Intelligence",
        footerPowered: "Powered by OpenWeatherMap API • Accessible in English & नेपाली",
        feelsLikePrefix: "Feels like",
        highLowPrefix: "H:",
        lowPrefix: "L:",
        liveWeather: "Live Weather",
        today: "Today",
        tomorrow: "Tomorrow",
        dawn: "Dawn",
        dusk: "Dusk",
        rainChance: "Rain",
        // Metric Interpretations
        humidityDry: "Dry air",
        humidityComfortable: "Comfortable",
        humidityHumid: "Humid",
        humidityVeryHumid: "Very Humid",
        dewDry: "Dry & Crisp",
        dewComfortable: "Comfortable",
        dewMuggy: "Somewhat muggy",
        dewOppressive: "Oppressive",
        visExcellent: "Crystal clear",
        visGood: "Good visibility",
        visModerate: "Moderate haze",
        visPoor: "Low visibility / Fog",
        pressStandard: "Standard pressure",
        pressHigh: "High pressure (Fair)",
        pressLow: "Low pressure (Stormy)",
        windCalm: "Calm",
        windLight: "Light breeze",
        windModerate: "Moderate breeze",
        windStrong: "Strong wind",
        windGale: "Gale / Storm",
        // Error Messages
        errEmptyCity: "Please enter a city name to search.",
        errCityNotFound: "Unable to find that city. Please check the spelling.",
        errGeoNotSupported: "Geolocation is not supported by your browser.",
        errLocationDenied: "Location permission was denied. Please enable location access or search manually.",
        errLocationUnavailable: "Your location could not be determined at this time.",
        errLocationTimeout: "Location request timed out. Please try again.",
        errGeneric: "Unable to fetch weather data. Please try again later.",
        loadingWeather: "Fetching latest weather data...",
        locatingPosition: "Locating your position...",
        days: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        daysShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
        monthsShort: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
        directions: ["N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE", "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW"],
        // Modal Previews & Trends
        mapsModalTitle: "Weather Maps & Radar",
        mapsModalSubtitle: "Live precipitation & satellite layer overview",
        monthlyModalTitle: "Monthly Climate Outlook",
        monthlyModalSubtitle: "Historical weather patterns & monthly averages",
        trendsModalTitle: "Weather Trends & Analytics",
        trendsModalSubtitle: "Comprehensive 5-day temperature and rain projection",
        trendsTitle: "5-Day Temperature Trend",
        trendsSubtitle: "Daily Curve",
        chartHigh: "High",
        chartLow: "Low"
    },
    ne: {
        appTitle: "WeatherVibe",
        appSubtitle: "वास्तविक समयको मौसम जानकारी",
        searchPlaceholder: "सहर खोज्नुहोस् (जस्तै काठमाडौँ, पोखरा, लण्डन)...",
        searchBtn: "खोज्नुहोस्",
        locationTooltip: "मेरो स्थान प्रयोग गर्नुहोस्",
        // Sidebar Navigation
        navCurrent: "हालको",
        navHourly: "घण्टागत",
        navDetails: "विवरण",
        navMaps: "नक्सा",
        navMonthly: "मासिक",
        navTrends: "ट्रेन्ड्स",
        backToTop: "शीर्षमा जानुहोस्",
        refresh: "ताजा गर्नुहोस्",
        // Section Titles
        hourlyTitle: "घण्टाको मौसम पूर्वानुमान",
        hourlySubtitle: "आगामी २४ घण्टा",
        dailyTitle: "५ दिनको मौसम पूर्वानुमान",
        dailySubtitle: "दैनिक पूर्वानुमान र वर्षा",
        detailsTitle: "मौसम विवरण",
        detailsSubtitle: "वायुमण्डलीय सूचकहरू",
        humidity: "आर्द्रता",
        wind: "हावाको गति र दिशा",
        feelsLike: "महसुस हुने तापक्रम",
        dewPoint: "ओस बिन्दु",
        visibility: "दृश्यता",
        pressure: "वायुमण्डलीय चाप",
        sunrise: "सूर्योदय",
        sunset: "सूर्यास्त",
        footer: "वेदरभाइब © २०२६ • वास्तविक समयको मौसम इन्टेलिजेन्स",
        footerPowered: "ओपनवेदरम्याप द्वारा संचालित • अंग्रेजी र नेपालीमा उपलब्ध",
        feelsLikePrefix: "महसुस:",
        highLowPrefix: "अधिकतम:",
        lowPrefix: "न्यूनतम:",
        liveWeather: "प्रत्यक्ष मौसम",
        today: "आज",
        tomorrow: "भोलि",
        dawn: "उज्यालो",
        dusk: "साँझपख",
        rainChance: "वर्षा",
        // Metric Interpretations
        humidityDry: "सुक्खा हावा",
        humidityComfortable: "आरामदायी",
        humidityHumid: "ओसिलो",
        humidityVeryHumid: "अत्यधिक ओसिलो",
        dewDry: "सुक्खा र सफा",
        dewComfortable: "आरामदायी",
        dewMuggy: "हल्का उमस",
        dewOppressive: "असहज उमस",
        visExcellent: "अत्यन्तै सफा दृश्य",
        visGood: "राम्रो दृश्यता",
        visModerate: "मध्यम धुम्म",
        visPoor: "कम दृश्यता / कुहिरो",
        pressStandard: "सामान्य चाप",
        pressHigh: "उच्च चाप (सफा मौसम)",
        pressLow: "न्यून चाप (वर्षा/आँधी सम्भावना)",
        windCalm: "शान्त",
        windLight: "मन्द हावा",
        windModerate: "मध्यम हावा",
        windStrong: "तीव्र हावा",
        windGale: "आँधीबेहरी",
        // Error Messages
        errEmptyCity: "कृपया खोज्नको लागि सहरको नाम लेख्नुहोस्।",
        errCityNotFound: "त्यो सहर फेला परेन। कृपया नामको हिज्जे जाँच गर्नुहोस्।",
        errGeoNotSupported: "तपाईंको ब्राउजरले स्थान पहिचान समर्थन गर्दैन।",
        errLocationDenied: "स्थान अनुमति अस्वीकार गरिएको छ। कृपया स्थान पहुँच अनुमति दिनुहोस् वा नामबाट खोज्नुहोस्।",
        errLocationUnavailable: "यस समयमा तपाईंको स्थान पत्ता लगाउन सकिएन।",
        errLocationTimeout: "स्थान अनुरोधको समय सकियो। कृपया पुनः प्रयास गर्नुहोस्।",
        errGeneric: "मौसम डेटा प्राप्त गर्न सकिएन। कृपया केही बेरपछि पुनः प्रयास गर्नुहोस्।",
        loadingWeather: "मौसम डेटा लोड हुँदैछ...",
        locatingPosition: "तपाईंको स्थान पत्ता लगाइँदैछ...",
        days: ["आइतबार", "सोमबार", "मङ्गलबार", "बुधबार", "बिहीबार", "शुक्रबार", "शनिबार"],
        daysShort: ["आइत", "सोम", "मङ्गल", "बुध", "बिही", "शुक्र", "शनि"],
        monthsShort: ["जनवरी", "फेब्रुअरी", "मार्च", "अप्रिल", "मे", "जुन", "जुलाई", "अगस्ट", "सेप्टेम्बर", "अक्टोबर", "नोभेम्बर", "डिसेम्बर"],
        directions: ["उत्तर", "उत्तर-उत्तर-पूर्व", "उत्तर-पूर्व", "पूर्व-उत्तर-पूर्व", "पूर्व", "पूर्व-दक्षिण-पूर्व", "दक्षिण-पूर्व", "दक्षिण-दक्षिण-पूर्व", "दक्षिण", "दक्षिण-दक्षिण-पश्चिम", "दक्षिण-पश्चिम", "पश्चिम-दक्षिण-पश्चिम", "पश्चिम", "पश्चिम-उत्तर-पश्चिम", "उत्तर-पश्चिम", "उत्तर-उत्तर-पश्चिम"],
        // Modal Previews & Trends
        mapsModalTitle: "मौसम नक्सा र राडार",
        mapsModalSubtitle: "प्रत्यक्ष वर्षा र उपग्रह तहको अवलोकन",
        monthlyModalTitle: "मासिक मौसम दृष्टिकोण",
        monthlyModalSubtitle: "ऐतिहासिक मौसम प्रवृत्ति र मासिक औसत",
        trendsModalTitle: "मौसम ट्रेन्ड्स र विश्लेषण",
        trendsModalSubtitle: "५ दिनको विस्तृत तापक्रम र वर्षा अनुमान",
        trendsTitle: "५ दिनको तापक्रम ट्रेन्ड",
        trendsSubtitle: "तापक्रम वक्र",
        chartHigh: "अधिकतम",
        chartLow: "न्यूनतम"
    }
};

// Weather Condition Translation Map
const WEATHER_CONDITIONS_NE = {
    "clear sky": "सफा आकाश",
    "few clouds": "थोरै बादल",
    "scattered clouds": "छरिएका बादल",
    "broken clouds": "बादल लागेको",
    "overcast clouds": "पूरै बादल लागेको",
    "light rain": "हल्का वर्षा",
    "moderate rain": "मध्यम वर्षा",
    "heavy intensity rain": "भारी वर्षा",
    "very heavy rain": "धेरै भारी वर्षा",
    "extreme rain": "चरम वर्षा",
    "freezing rain": "जम्ने वर्षा",
    "light intensity shower rain": "हल्का वर्षाको झरी",
    "shower rain": "झरी वर्षा",
    "heavy intensity shower rain": "ठूलो झरी वर्षा",
    "ragged shower rain": "अव्यवस्थित झरी",
    "light intensity drizzle": "हल्का सिमसिम पानी",
    "drizzle": "सिमसिम पानी",
    "heavy intensity drizzle": "ठूलो सिमसिम पानी",
    "light intensity drizzle rain": "हल्का सिमसिमे झरी",
    "drizzle rain": "सिमसिमे झरी",
    "heavy intensity drizzle rain": "भारी सिमसिमे झरी",
    "shower rain and drizzle": "झरी र सिमसिम पानी",
    "heavy shower rain and drizzle": "ठूलो झरी र सिमसिम पानी",
    "shower drizzle": "सिमसिम झरी",
    "thunderstorm": "चट्याङसहित वर्षा",
    "thunderstorm with light rain": "हल्का वर्षासहित चट्याङ",
    "thunderstorm with rain": "वर्षासहित चट्याङ",
    "thunderstorm with heavy rain": "भारी वर्षासहित चट्याङ",
    "light thunderstorm": "हल्का चट्याङ",
    "heavy thunderstorm": "ठूलो चट्याङ",
    "ragged thunderstorm": "तीव्र चट्याङ",
    "thunderstorm with light drizzle": "हल्का सिमसिमसहित चट्याङ",
    "thunderstorm with drizzle": "सिमसिमसहित चट्याङ",
    "thunderstorm with heavy drizzle": "ठूलो सिमसिमसहित चट्याङ",
    "light snow": "हल्का हिमपात",
    "snow": "हिमपात",
    "heavy snow": "भारी हिमपात",
    "sleet": "करकापात",
    "light shower sleet": "हल्का करकापात झरी",
    "shower sleet": "करकापात झरी",
    "light rain and snow": "हल्का पानी र हिउँ",
    "rain and snow": "पानी र हिमपात",
    "light shower snow": "हल्का हिमपातको झरी",
    "shower snow": "हिमपातको झरी",
    "heavy shower snow": "ठूलो हिमपात झरी",
    "mist": "हुस्सु",
    "fog": "कुहिरो",
    "haze": "धुम्म",
    "dust": "धुलो",
    "sand": "बालुवाको आँधी",
    "smoke": "धुवाँ",
    "sand/dust whirls": "धुलोको हुरी",
    "squalls": "हावाहुरी",
    "tornado": "टोर्नाडो / भीषण चक्रवात"
};

// --- INITIALIZATION ---
document.addEventListener("DOMContentLoaded", () => {
    // Set initial language from storage or default
    languageSelect.value = currentLanguage;
    applyLanguage(currentLanguage);

    // Initialize Theme
    initTheme();

    // Event Listeners
    setupEventListeners();

    // Initial placeholder trend data for instant rendering
    const sampleDays = currentLanguage === "ne" ? ["सोम", "मङ्गल", "बुध", "बिही", "शुक्र"] : ["Mon", "Tue", "Wed", "Thu", "Fri"];
    renderForecastChart(sampleDays, [26, 28, 25, 27, 29], [17, 18, 16, 17, 19]);

    // Load initial city (saved or Kathmandu default)
    const initialCity = localStorage.getItem("weatherVibe_lastCity") || "Kathmandu";
    cityInput.value = initialCity;
    updateClearBtnVisibility();
    fetchWeatherData(initialCity);
});

function setupEventListeners() {
    // Search form submission
    searchForm.addEventListener("submit", (e) => {
        e.preventDefault();
        handleSearch();
    });

    // Location button
    locationBtn.addEventListener("click", handleGeolocation);

    // Input clearing & typing
    cityInput.addEventListener("input", updateClearBtnVisibility);
    clearInputBtn.addEventListener("click", () => {
        cityInput.value = "";
        cityInput.focus();
        updateClearBtnVisibility();
    });

    // Theme button
    themeBtn.addEventListener("click", toggleTheme);

    // Language selector
    languageSelect.addEventListener("change", (e) => {
        currentLanguage = e.target.value;
        localStorage.setItem("weatherVibe_lang", currentLanguage);
        applyLanguage(currentLanguage);
    });

    // Dismiss Alert
    closeAlertBtn.addEventListener("click", hideAlert);

    // Sidebar Navigation Buttons
    navBtns.forEach((btn) => {
        btn.addEventListener("click", () => {
            const targetNav = btn.getAttribute("data-nav");
            setActiveNavigation(targetNav);
        });
    });

    // Sidebar Footer Action: Back to top
    if (scrollTopBtn) {
        scrollTopBtn.addEventListener("click", () => {
            window.scrollTo({ top: 0, behavior: "smooth" });
        });
    }

    // Sidebar Footer Action: Refresh Weather
    if (refreshWeatherBtn) {
        refreshWeatherBtn.addEventListener("click", async () => {
            refreshWeatherBtn.classList.add("rotating");
            const currentCity = cityInput.value.trim() || localStorage.getItem("weatherVibe_lastCity") || "Kathmandu";
            await fetchWeatherData(currentCity);
            setTimeout(() => {
                refreshWeatherBtn.classList.remove("rotating");
            }, 800);
        });
    }

    // Modal close listeners
    if (navModalCloseBtn) navModalCloseBtn.addEventListener("click", closeNavModal);
    if (navModalBackdrop) navModalBackdrop.addEventListener("click", closeNavModal);
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && navViewModal.style.display !== "none") {
            closeNavModal();
        }
    });
}

function updateClearBtnVisibility() {
    clearInputBtn.style.display = cityInput.value.trim() ? "flex" : "none";
}

// --- SIDEBAR NAVIGATION LOGIC ---
function setActiveNavigation(navKey) {
    activeNav = navKey;

    // Update active class on all nav buttons
    navBtns.forEach((btn) => {
        const isMatch = btn.getAttribute("data-nav") === navKey;
        btn.classList.toggle("active", isMatch);
        if (isMatch) {
            btn.setAttribute("aria-current", "page");
        } else {
            btn.removeAttribute("aria-current");
        }
    });

    // Handle scroll or modal action depending on selected tab
    switch (navKey) {
        case "current":
            currentWeatherCard.scrollIntoView({ behavior: "smooth", block: "start" });
            break;
        case "hourly":
            hourlyHeadingEl.scrollIntoView({ behavior: "smooth", block: "start" });
            break;
        case "details":
            detailsHeadingEl.scrollIntoView({ behavior: "smooth", block: "start" });
            break;
        case "trends":
            if (trendsSectionEl) {
                trendsSectionEl.scrollIntoView({ behavior: "smooth", block: "start" });
                trendsSectionEl.style.transition = "transform 0.3s ease";
                trendsSectionEl.style.transform = "scale(1.01)";
                setTimeout(() => { trendsSectionEl.style.transform = "none"; }, 350);
            } else {
                dailyHeadingEl.scrollIntoView({ behavior: "smooth", block: "start" });
            }
            break;
        case "maps":
            openNavModal("maps");
            break;
        case "monthly":
            openNavModal("monthly");
            break;
    }
}

// --- NAVIGATION VIEW MODAL (Maps, Monthly, Trends) ---
function openNavModal(type) {
    const t = I18N[currentLanguage];
    const city = currentWeatherData ? currentWeatherData.name : "Kathmandu";
    const country = currentWeatherData ? currentWeatherData.sys.country : "NP";

    if (type === "maps") {
        navModalTitle.textContent = t.mapsModalTitle;
        navModalSubtitle.textContent = `${t.mapsModalSubtitle} • ${city}, ${country}`;
        navModalIconBadge.innerHTML = `
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21"/>
                <line x1="9" y1="3" x2="9" y2="18"/>
                <line x1="15" y1="6" x2="15" y2="21"/>
            </svg>
        `;
        const lat = currentWeatherData ? currentWeatherData.coord.lat : 27.71;
        const lon = currentWeatherData ? currentWeatherData.coord.lon : 85.32;
        const clouds = currentWeatherData ? currentWeatherData.clouds.all : 45;

        navModalBody.innerHTML = `
            <p>${currentLanguage === "ne" ? "यस क्षेत्रको प्रत्यक्ष मौसम राडार, वर्षा घनत्व र बादलको स्थिति सक्रिय छ।" : "Active weather radar and atmospheric satellite layers are monitoring current regional patterns."}</p>
            <div class="modal-stat-grid">
                <div class="modal-stat-card">
                    <span class="modal-stat-label">${currentLanguage === "ne" ? "अक्षांश र देशान्तर" : "Coordinates"}</span>
                    <span class="modal-stat-val">${lat}°, ${lon}°</span>
                </div>
                <div class="modal-stat-card">
                    <span class="modal-stat-label">${currentLanguage === "ne" ? "बादल आवरण" : "Cloud Coverage"}</span>
                    <span class="modal-stat-val">${clouds}%</span>
                </div>
                <div class="modal-stat-card">
                    <span class="modal-stat-label">${currentLanguage === "ne" ? "राडार स्थिति" : "Radar Status"}</span>
                    <span class="modal-stat-val" style="color: var(--accent-emerald)">${currentLanguage === "ne" ? "सक्रिय" : "Online"}</span>
                </div>
                <div class="modal-stat-card">
                    <span class="modal-stat-label">${currentLanguage === "ne" ? "वर्षा स्क्यान" : "Precipitation Scan"}</span>
                    <span class="modal-stat-val">${currentWeatherData?.rain ? "Rain Active" : "Clear"}</span>
                </div>
            </div>
        `;
    } else if (type === "monthly") {
        navModalTitle.textContent = t.monthlyModalTitle;
        navModalSubtitle.textContent = `${t.monthlyModalSubtitle} • ${city}`;
        navModalIconBadge.innerHTML = `
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <rect width="18" height="18" x="3" y="4" rx="2" ry="2"/>
                <line x1="16" y1="2" x2="16" y2="6"/>
                <line x1="8" y1="2" x2="8" y2="6"/>
                <line x1="3" y1="10" x2="21" y2="10"/>
            </svg>
        `;
        const temp = currentWeatherData ? Math.round(currentWeatherData.main.temp) : 22;
        navModalBody.innerHTML = `
            <p>${currentLanguage === "ne" ? "चालु महिनाको औसत तापक्रम र मौसमी जलवायु तथ्याङ्क।" : "Aggregated monthly historical climate indicators and seasonal projections."}</p>
            <div class="modal-stat-grid">
                <div class="modal-stat-card">
                    <span class="modal-stat-label">${currentLanguage === "ne" ? "औसत तापक्रम" : "Average Temp"}</span>
                    <span class="modal-stat-val">${temp}°C</span>
                </div>
                <div class="modal-stat-card">
                    <span class="modal-stat-label">${currentLanguage === "ne" ? "मौसमी प्रवृत्ति" : "Seasonal Phase"}</span>
                    <span class="modal-stat-val">${currentLanguage === "ne" ? "वर्षा/मनसुन" : "Late Summer"}</span>
                </div>
            </div>
        `;
    }

    navViewModal.style.display = "flex";
    navViewModal.setAttribute("aria-hidden", "false");
}

function closeNavModal() {
    navViewModal.style.display = "none";
    navViewModal.setAttribute("aria-hidden", "true");
}

// --- THEME MANAGEMENT ---
function initTheme() {
    const savedTheme = localStorage.getItem("weatherVibe_theme");
    if (savedTheme === "dark" || (!savedTheme && window.matchMedia("(prefers-color-scheme: dark)").matches)) {
        document.body.classList.add("dark-mode");
    } else {
        document.body.classList.remove("dark-mode");
    }
}

function toggleTheme() {
    const isDark = document.body.classList.toggle("dark-mode");
    localStorage.setItem("weatherVibe_theme", isDark ? "dark" : "light");
}

// --- LANGUAGE SYSTEM & UI TRANSLATION ---
function applyLanguage(lang) {
    const t = I18N[lang] || I18N.en;

    // Body class for font styling
    if (lang === "ne") {
        document.body.classList.add("lang-ne");
    } else {
        document.body.classList.remove("lang-ne");
    }

    // Static text updates
    appTitleEl.textContent = t.appTitle;
    appSubtitleEl.textContent = t.appSubtitle;
    cityInput.placeholder = t.searchPlaceholder;
    searchBtn.querySelector(".btn-text").textContent = t.searchBtn;
    locationTooltipEl.textContent = t.locationTooltip;
    locationBtn.setAttribute("title", t.locationTooltip);

    // Sidebar Navigation Labels
    if (navTextCurrent) navTextCurrent.textContent = t.navCurrent;
    if (navTextHourly) navTextHourly.textContent = t.navHourly;
    if (navTextDetails) navTextDetails.textContent = t.navDetails;
    if (navTextMaps) navTextMaps.textContent = t.navMaps;
    if (navTextMonthly) navTextMonthly.textContent = t.navMonthly;
    if (navTextTrends) navTextTrends.textContent = t.navTrends;

    if (scrollTopBtn) scrollTopBtn.setAttribute("title", t.backToTop);
    if (refreshWeatherBtn) refreshWeatherBtn.setAttribute("title", t.refresh);

    hourlyHeadingEl.textContent = t.hourlyTitle;
    hourlySubtitleEl.textContent = t.hourlySubtitle;
    if (dailyHeadingEl) dailyHeadingEl.textContent = t.dailyTitle;
    if (dailySubtitleEl) dailySubtitleEl.textContent = t.dailySubtitle;
    if (trendsHeadingEl) trendsHeadingEl.textContent = t.trendsTitle;
    if (trendsSubtitleEl) trendsSubtitleEl.textContent = t.trendsSubtitle;
    if (legendHighTextEl) legendHighTextEl.textContent = t.chartHigh;
    if (legendLowTextEl) legendLowTextEl.textContent = t.chartLow;
    if (detailsHeadingEl) detailsHeadingEl.textContent = t.detailsTitle;
    if (detailsSubtitleEl) detailsSubtitleEl.textContent = t.detailsSubtitle;

    humidityLabelEl.textContent = t.humidity;
    windLabelEl.textContent = t.wind;
    feelsLikeLabelEl.textContent = t.feelsLike;
    dewPointLabelEl.textContent = t.dewPoint;
    visibilityLabelEl.textContent = t.visibility;
    pressureLabelEl.textContent = t.pressure;
    sunriseLabelEl.textContent = t.sunrise;
    sunsetLabelEl.textContent = t.sunset;
    footerTextEl.textContent = t.footer;
    footerPoweredEl.textContent = t.footerPowered;

    // If weather data is already loaded, re-render immediately
    if (currentWeatherData && currentForecastData) {
        renderCurrentWeather(currentWeatherData, currentForecastData);
        renderHourlyForecast(currentForecastData);
        renderDailyForecast(currentForecastData);
        renderDetailedMetrics(currentWeatherData, currentForecastData);
    }
}

function translateWeatherCondition(description) {
    if (!description) return "";
    if (currentLanguage === "en") {
        return description.charAt(0).toUpperCase() + description.slice(1);
    }
    const cleanDesc = description.toLowerCase().trim();
    return WEATHER_CONDITIONS_NE[cleanDesc] || description;
}

// --- API DATA FETCHING ---
async function handleSearch() {
    const query = cityInput.value.trim();
    if (!query) {
        showAlert(I18N[currentLanguage].errEmptyCity);
        return;
    }
    await fetchWeatherData(query);
}

async function fetchWeatherData(cityQuery) {
    setLoadingState(true);
    hideAlert();

    try {
        const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(cityQuery)}&appid=${API_KEY}&units=metric`;
        const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${encodeURIComponent(cityQuery)}&appid=${API_KEY}&units=metric`;

        const [weatherRes, forecastRes] = await Promise.all([
            fetch(weatherUrl),
            fetch(forecastUrl)
        ]);

        const weatherData = await weatherRes.json();
        const forecastData = await forecastRes.json();

        if (!weatherRes.ok) {
            if (weatherData.cod === "404" || weatherData.message?.includes("not found")) {
                throw new Error("CITY_NOT_FOUND");
            }
            throw new Error(weatherData.message || "FETCH_ERROR");
        }

        if (!forecastRes.ok) {
            throw new Error(forecastData.message || "FORECAST_ERROR");
        }

        currentWeatherData = weatherData;
        currentForecastData = forecastData;

        // Save last successful city
        localStorage.setItem("weatherVibe_lastCity", weatherData.name);

        // Update UI
        renderCurrentWeather(weatherData, forecastData);
        renderHourlyForecast(forecastData);
        renderDailyForecast(forecastData);
        renderDetailedMetrics(weatherData, forecastData);
        updateAtmosphere(weatherData);

    } catch (err) {
        console.error("Weather Fetch Error:", err);
        if (err.message === "CITY_NOT_FOUND") {
            showAlert(I18N[currentLanguage].errCityNotFound);
        } else {
            showAlert(I18N[currentLanguage].errGeneric);
        }
    } finally {
        setLoadingState(false);
    }
}

// --- GEOLOCATION HANDLING ---
function handleGeolocation() {
    if (!navigator.geolocation) {
        showAlert(I18N[currentLanguage].errGeoNotSupported);
        return;
    }

    setLoadingState(true);
    hideAlert();

    navigator.geolocation.getCurrentPosition(
        async (position) => {
            const { latitude, longitude } = position.coords;
            try {
                const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`;
                const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`;

                const [weatherRes, forecastRes] = await Promise.all([
                    fetch(weatherUrl),
                    fetch(forecastUrl)
                ]);

                const weatherData = await weatherRes.json();
                const forecastData = await forecastRes.json();

                if (!weatherRes.ok || !forecastRes.ok) {
                    throw new Error("COORDS_FETCH_ERROR");
                }

                currentWeatherData = weatherData;
                currentForecastData = forecastData;

                cityInput.value = weatherData.name;
                updateClearBtnVisibility();
                localStorage.setItem("weatherVibe_lastCity", weatherData.name);

                renderCurrentWeather(weatherData, forecastData);
                renderHourlyForecast(forecastData);
                renderDailyForecast(forecastData);
                renderDetailedMetrics(weatherData, forecastData);
                updateAtmosphere(weatherData);

            } catch (error) {
                console.error("Coords Weather Error:", error);
                showAlert(I18N[currentLanguage].errGeneric);
            } finally {
                setLoadingState(false);
            }
        },
        (error) => {
            setLoadingState(false);
            if (error.code === error.PERMISSION_DENIED) {
                showAlert(I18N[currentLanguage].errLocationDenied);
            } else if (error.code === error.POSITION_UNAVAILABLE) {
                showAlert(I18N[currentLanguage].errLocationUnavailable);
            } else if (error.code === error.TIMEOUT) {
                showAlert(I18N[currentLanguage].errLocationTimeout);
            } else {
                showAlert(I18N[currentLanguage].errGeneric);
            }
        },
        { timeout: 10000, enableHighAccuracy: true }
    );
}

// --- PREMIUM INLINE WEATHER ICONS ---
// Local SVG icons avoid broken/low-quality external icon assets and keep the visual
// language consistent across the hero, hourly cards, and daily cards.
function weatherIconSvg(weather, size = 64, label = "Weather condition") {
    const main = String(weather?.main || "").toLowerCase();
    const description = String(weather?.description || "").toLowerCase();
    const iconCode = weather?.icon || "01d";
    const night = iconCode.endsWith("n");

    const safeLabel = label.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
    const svgStart = `<svg class="weather-svg weather-svg-${night ? "night" : "day"}" width="${size}" height="${size}" viewBox="0 0 120 120" role="img" aria-label="${safeLabel}" xmlns="http://www.w3.org/2000/svg">`;
    const defs = `
        <defs>
            <linearGradient id="sunGradient" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stop-color="#FFE58A"/>
                <stop offset="55%" stop-color="#FFC857"/>
                <stop offset="100%" stop-color="#F59E0B"/>
            </linearGradient>
            <linearGradient id="cloudGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stop-color="#F8FAFC"/>
                <stop offset="100%" stop-color="#CBD5E1"/>
            </linearGradient>
            <linearGradient id="rainGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stop-color="#7DD3FC"/>
                <stop offset="100%" stop-color="#38BDF8"/>
            </linearGradient>
            <filter id="iconGlow" x="-60%" y="-60%" width="220%" height="220%">
                <feGaussianBlur stdDeviation="5" result="blur"/>
                <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
            </filter>
        </defs>`;

    const sun = `
        <g class="sun-art">
            <circle cx="38" cy="39" r="19" fill="url(#sunGradient)" filter="url(#iconGlow)"/>
            <g stroke="#FFD66B" stroke-width="4" stroke-linecap="round" opacity=".95">
                <path d="M38 8v10"/><path d="M38 60v10"/><path d="M7 39h10"/><path d="M59 39h10"/>
                <path d="M16 17l7 7"/><path d="M53 54l7 7"/><path d="M60 17l-7 7"/><path d="M23 54l-7 7"/>
            </g>
        </g>`;

    const moon = `
        <g class="moon-art">
            <path d="M57 14c-13 4-22 16-22 30 0 18 14 32 32 32 7 0 14-2 19-6-4 1-7 2-11 2-19 0-34-15-34-34 0-10 4-19 10-24 2-1 4-2 6-3Z" fill="#E0E7FF" filter="url(#iconGlow)"/>
            <g fill="#C7D2FE" opacity=".8"><circle cx="75" cy="22" r="2"/><circle cx="90" cy="39" r="1.7"/><circle cx="68" cy="57" r="1.5"/></g>
        </g>`;

    const cloud = `
        <g class="cloud-art">
            <path d="M28 86h62c11 0 20-8 20-18s-8-18-18-19c-3-12-14-20-27-20-14 0-26 10-28 23-11 1-19 9-19 19 0 8 4 15 10 15Z" fill="url(#cloudGradient)" stroke="#E2E8F0" stroke-width="2"/>
            <path d="M30 80h56" stroke="#94A3B8" stroke-width="3" stroke-linecap="round" opacity=".35"/>
        </g>`;

    let art = "";

    if (main.includes("thunder")) {
        art = `${cloud}<path d="M64 61 49 86h13l-7 22 25-32H67l8-15Z" fill="#C084FC" stroke="#F5D0FE" stroke-width="2" stroke-linejoin="round" filter="url(#iconGlow)"/>`;
    } else if (main.includes("snow")) {
        art = `${cloud}<g stroke="#67E8F9" stroke-width="3" stroke-linecap="round"><path d="M43 93v15M36 100h14M38 95l10 10M48 95l-10 10"/><path d="M67 91v18M59 100h16M61 94l12 12M73 94l-12 12"/><path d="M89 92v16M82 100h14M84 95l10 10M94 95l-10 10"/></g>`;
    } else if (main.includes("rain") || main.includes("drizzle")) {
        art = `${cloud}<g stroke="url(#rainGradient)" stroke-width="4" stroke-linecap="round"><path d="M39 94l-5 13"/><path d="M57 94l-5 13"/><path d="M75 94l-5 13"/><path d="M93 94l-5 13"/></g>`;
    } else if (main.includes("mist") || main.includes("fog") || main.includes("haze")) {
        art = `<g stroke="#E2E8F0" stroke-linecap="round"><path d="M22 43h76" stroke-width="6" opacity=".75"/><path d="M14 61h92" stroke-width="6" opacity=".55"/><path d="M25 79h70" stroke-width="6" opacity=".4"/></g>`;
    } else if (main.includes("cloud")) {
        art = `${night ? moon : sun}${cloud}`;
    } else if (night) {
        art = moon;
    } else {
        art = sun;
    }

    return `${svgStart}${defs}${art}</svg>`;
}

// --- RENDER CURRENT WEATHER HERO ---
function renderCurrentWeather(data, forecastData) {
    const t = I18N[currentLanguage];

    // City & Country
    cityNameEl.textContent = `${data.name}, ${data.sys.country}`;

    // Local Date & Time (accounting for timezone offset)
    const localDate = getCityLocalDate(data.dt, data.timezone);
    currentDateTimeEl.textContent = formatDateTime(localDate, currentLanguage);

    // Live Weather Badge
    badgeConditionTextEl.textContent = t.liveWeather;

    // Temperature & Description
    const temp = Math.round(data.main.temp);
    temperatureEl.textContent = temp;

    const rawDesc = data.weather[0]?.description || "";
    descriptionEl.textContent = translateWeatherCondition(rawDesc);

    // Feels Like & High/Low Pills
    const feelsLikeTemp = Math.round(data.main.feels_like);
    heroFeelsLikeEl.textContent = `${t.feelsLikePrefix} ${feelsLikeTemp}°C`;

    // Extract High and Low from today's forecast / current data
    const todayTemps = getTodayMinMax(forecastData, data);
    heroHighLowEl.textContent = `${t.highLowPrefix} ${todayTemps.max}° ${t.lowPrefix} ${todayTemps.min}°`;

    // Premium local SVG weather icon — no external image dependency.
    weatherIconWrapper.innerHTML = weatherIconSvg(data.weather[0], 156, rawDesc || "Current weather");
}

// --- RENDER HOURLY FORECAST ---
function renderHourlyForecast(forecastData) {
    if (!forecastData || !forecastData.list) return;
    const t = I18N[currentLanguage];

    // Display next 8 intervals (24 hours)
    const nextHours = forecastData.list.slice(0, 8);
    hourlyContainer.innerHTML = "";

    nextHours.forEach((item, index) => {
        const itemDate = getCityLocalDate(item.dt, forecastData.city.timezone);
        const timeString = formatHourlyTime(itemDate, currentLanguage, index === 0);

        const temp = Math.round(item.main.temp);
        const iconCode = item.weather[0]?.icon || "01d";
        const rawDesc = item.weather[0]?.description || "";
        const pop = Math.round((item.pop || 0) * 100);

        const card = document.createElement("div");
        card.className = `hourly-card ${index === 0 ? "active" : ""}`;
        card.innerHTML = `
            <span class="hourly-time">${timeString}</span>
            <div class="hourly-icon-box">
                ${weatherIconSvg(item.weather[0], 58, rawDesc || "Weather condition")}
            </div>
            <span class="hourly-temp">${temp}°</span>
            <span class="hourly-rain" title="${t.rainChance}: ${pop}%">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"/>
                </svg>
                ${pop}%
            </span>
        `;
        hourlyContainer.appendChild(card);
    });
}

// --- RENDER 5-DAY / EXTENDED FORECAST ---
function renderDailyForecast(forecastData) {
    if (!forecastData || !forecastData.list) return;
    const t = I18N[currentLanguage];

    // Group 3-hourly entries by day
    const daysMap = {};
    const timezone = forecastData.city.timezone;

    forecastData.list.forEach((item) => {
        const localDate = getCityLocalDate(item.dt, timezone);
        const dateKey = `${localDate.getFullYear()}-${String(localDate.getMonth() + 1).padStart(2, "0")}-${String(localDate.getDate()).padStart(2, "0")}`;

        if (!daysMap[dateKey]) {
            daysMap[dateKey] = {
                date: localDate,
                temps: [],
                weatherItems: [],
                pops: [],
                rainSum: 0
            };
        }

        daysMap[dateKey].temps.push(item.main.temp);
        daysMap[dateKey].weatherItems.push(item.weather[0]);
        daysMap[dateKey].pops.push(item.pop || 0);

        if (item.rain && item.rain["3h"]) {
            daysMap[dateKey].rainSum += item.rain["3h"];
        }
    });

    const dayKeys = Object.keys(daysMap).slice(0, 5);
    dailyContainer.innerHTML = "";

    dayKeys.forEach((key, index) => {
        const dayData = daysMap[key];
        const maxTemp = Math.round(Math.max(...dayData.temps));
        const minTemp = Math.round(Math.min(...dayData.temps));
        const maxPop = Math.round(Math.max(...dayData.pops) * 100);

        // Pick midday weather condition or representative icon
        const midIdx = Math.floor(dayData.weatherItems.length / 2);
        const weatherObj = dayData.weatherItems[midIdx] || dayData.weatherItems[0];
        const iconCode = weatherObj?.icon || "01d";
        const translatedCondition = translateWeatherCondition(weatherObj?.description || "");

        // Day label (Today, Tomorrow, or Day Name)
        let dayLabel = "";
        if (index === 0) {
            dayLabel = t.today;
        } else if (index === 1) {
            dayLabel = t.tomorrow;
        } else {
            const dayNum = dayData.date.getDay();
            dayLabel = t.daysShort[dayNum];
        }

        // Date string (e.g. Aug 22)
        const monthNum = dayData.date.getMonth();
        const dateNum = dayData.date.getDate();
        const dateLabel = `${t.monthsShort[monthNum]} ${dateNum}`;

        // Rain volume formatted
        let rainVolumeHtml = "";
        if (dayData.rainSum > 0.1) {
            const rainAmountStr = dayData.rainSum >= 10
                ? `${(dayData.rainSum / 10).toFixed(2)} cm`
                : `${dayData.rainSum.toFixed(1)} mm`;
            rainVolumeHtml = `<span class="daily-rain-volume" title="Rainfall">${rainAmountStr}</span>`;
        }

        const card = document.createElement("div");
        card.className = "daily-card";
        card.innerHTML = `
            <div class="daily-card-header">
                <span class="daily-day">${dayLabel}</span>
                <span class="daily-date">${dateLabel}</span>
            </div>
            <div class="daily-icon-wrapper">
                ${weatherIconSvg(weatherObj, 66, weatherObj?.description || "Weather condition")}
            </div>
            <span class="daily-condition">${translatedCondition}</span>
            <div class="daily-temp-range">
                <span class="daily-temp-max">${maxTemp}°</span>
                <span class="daily-temp-min">${minTemp}°</span>
            </div>
            <div class="daily-rain-metrics">
                <span class="daily-rain-chance" title="${t.rainChance}">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"/>
                    </svg>
                    ${maxPop}%
                </span>
                ${rainVolumeHtml}
            </div>
        `;
        dailyContainer.appendChild(card);
    });

    // Extract dynamic series for the 5-day trend chart
    const chartDates = [];
    const chartMaxTemps = [];
    const chartMinTemps = [];

    dayKeys.forEach((key, index) => {
        const dayData = daysMap[key];
        const maxTemp = Math.round(Math.max(...dayData.temps));
        const minTemp = Math.round(Math.min(...dayData.temps));
        let dayLabel = "";
        if (index === 0) {
            dayLabel = t.today;
        } else if (index === 1) {
            dayLabel = t.tomorrow;
        } else {
            const dayNum = dayData.date.getDay();
            dayLabel = t.daysShort[dayNum];
        }
        chartDates.push(dayLabel);
        chartMaxTemps.push(maxTemp);
        chartMinTemps.push(minTemp);
    });

    // Render / Update Chart.js 5-Day Trend Line Graph
    renderForecastChart(chartDates, chartMaxTemps, chartMinTemps);
}

// --- RENDER DETAILED WEATHER METRICS ---
function renderDetailedMetrics(data, forecastData) {
    const t = I18N[currentLanguage];

    // 1. Humidity
    const humidityVal = data.main.humidity;
    humidityEl.textContent = `${humidityVal}%`;
    if (humidityVal < 30) {
        humidityQualityEl.textContent = t.humidityDry;
    } else if (humidityVal <= 60) {
        humidityQualityEl.textContent = t.humidityComfortable;
    } else if (humidityVal <= 80) {
        humidityQualityEl.textContent = t.humidityHumid;
    } else {
        humidityQualityEl.textContent = t.humidityVeryHumid;
    }

    // 2. Wind Velocity & Direction
    const windSpeedKmH = (data.wind.speed * 3.6).toFixed(1);
    windEl.textContent = `${windSpeedKmH} km/h`;

    const windDeg = data.wind.deg || 0;
    const directionData = getWindDirectionData(windDeg);
    windDirectionEl.textContent = directionData.translated;
    windDegreeEl.textContent = `(${windDeg}°)`;

    // Rotate compass needle to exact wind direction
    compassNeedleEl.style.transform = `rotate(${windDeg}deg)`;

    // 3. Feels Like
    const feelsLikeVal = Math.round(data.main.feels_like);
    feelsLikeEl.textContent = `${feelsLikeVal}°C`;
    const tempDiff = Math.abs(feelsLikeVal - Math.round(data.main.temp));
    if (tempDiff <= 1) {
        feelsLikeDescEl.textContent = currentLanguage === "ne" ? "वास्तविक तापक्रम बराबर" : "Similar to actual";
    } else if (feelsLikeVal > data.main.temp) {
        feelsLikeDescEl.textContent = currentLanguage === "ne" ? "वास्तविक भन्दा न्यानो" : "Warmer than actual";
    } else {
        feelsLikeDescEl.textContent = currentLanguage === "ne" ? "वास्तविक भन्दा चिसो" : "Colder than actual";
    }

    // 4. Dew Point (Magnus-Tetens meteorological computation)
    const tempC = data.main.temp;
    const dewPointVal = calculateDewPoint(tempC, humidityVal);
    dewPointEl.textContent = `${dewPointVal}°C`;

    if (dewPointVal < 10) {
        dewPointDescEl.textContent = t.dewDry;
    } else if (dewPointVal <= 16) {
        dewPointDescEl.textContent = t.dewComfortable;
    } else if (dewPointVal <= 21) {
        dewPointDescEl.textContent = t.dewMuggy;
    } else {
        dewPointDescEl.textContent = t.dewOppressive;
    }

    // 5. Visibility
    const visibilityKm = (data.visibility / 1000).toFixed(1);
    visibilityEl.textContent = `${visibilityKm} km`;

    if (data.visibility >= 10000) {
        visibilityDescEl.textContent = t.visExcellent;
    } else if (data.visibility >= 6000) {
        visibilityDescEl.textContent = t.visGood;
    } else if (data.visibility >= 3000) {
        visibilityDescEl.textContent = t.visModerate;
    } else {
        visibilityDescEl.textContent = t.visPoor;
    }

    // 6. Atmospheric Pressure
    const pressureVal = data.main.pressure;
    pressureEl.textContent = `${pressureVal} hPa`;

    if (pressureVal > 1015) {
        pressureDescEl.textContent = t.pressHigh;
    } else if (pressureVal < 1005) {
        pressureDescEl.textContent = t.pressLow;
    } else {
        pressureDescEl.textContent = t.pressStandard;
    }

    // 7 & 8. Sunrise and Sunset (Timezone adjusted)
    const sunriseDate = getCityLocalDate(data.sys.sunrise, data.timezone);
    const sunsetDate = getCityLocalDate(data.sys.sunset, data.timezone);

    sunriseEl.textContent = formatTimeOnly(sunriseDate);
    sunsetEl.textContent = formatTimeOnly(sunsetDate);

    sunriseSubtextEl.textContent = t.dawn;
    sunsetSubtextEl.textContent = t.dusk;
}

// --- METEOROLOGICAL & MATH HELPERS ---

/**
 * Standard Magnus-Tetens formula for calculating Dew Point from Temperature (°C) and Relative Humidity (%)
 */
function calculateDewPoint(temperature, relativeHumidity) {
    if (relativeHumidity <= 0) return 0;
    const a = 17.27;
    const b = 237.7;
    const alpha = ((a * temperature) / (b + temperature)) + Math.log(relativeHumidity / 100);
    const dewPoint = (b * alpha) / (a - alpha);
    return Math.round(dewPoint);
}

/**
 * Maps 0..360 degrees to 16 cardinal wind directions
 */
function getWindDirectionData(degrees) {
    const idx = Math.round((degrees % 360) / 22.5) % 16;
    const code = I18N.en.directions[idx];
    const translated = I18N[currentLanguage].directions[idx];
    return { code, translated };
}

/**
 * Calculates local Date object for target city given timestamp and UTC offset in seconds
 */
function getCityLocalDate(timestampSec, timezoneOffsetSec) {
    const d = new Date((timestampSec + timezoneOffsetSec) * 1000);
    return new Date(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate(), d.getUTCHours(), d.getUTCMinutes(), d.getUTCSeconds());
}

/**
 * Formats full Date & Time based on active language
 */
function formatDateTime(dateObj, lang) {
    const t = I18N[lang] || I18N.en;
    const dayName = t.days[dateObj.getDay()];
    const monthName = t.monthsShort[dateObj.getMonth()];
    const dateNum = dateObj.getDate();
    const timeStr = formatTimeOnly(dateObj);

    return `${dayName}, ${monthName} ${dateNum} • ${timeStr}`;
}

/**
 * Formats standard 12-hour time (e.g. 06:45 AM)
 */
function formatTimeOnly(dateObj) {
    let hours = dateObj.getHours();
    const minutes = String(dateObj.getMinutes()).padStart(2, "0");
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12 || 12;
    return `${hours}:${minutes} ${ampm}`;
}

/**
 * Formats hourly timeline label (e.g. "Now", "10 PM", "11 PM")
 */
function formatHourlyTime(dateObj, lang, isFirst) {
    if (isFirst) {
        return lang === "ne" ? "अहिले" : "Now";
    }
    let hours = dateObj.getHours();
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12 || 12;
    return `${hours} ${ampm}`;
}

/**
 * Determines today's min and max temperatures from current data and forecast list
 */
function getTodayMinMax(forecastData, currentData) {
    if (!forecastData || !forecastData.list || forecastData.list.length === 0) {
        return {
            min: Math.round(currentData.main.temp_min),
            max: Math.round(currentData.main.temp_max)
        };
    }
    const slices = forecastData.list.slice(0, 8);
    const temps = slices.map(s => s.main.temp);
    temps.push(currentData.main.temp);

    return {
        min: Math.round(Math.min(...temps)),
        max: Math.round(Math.max(...temps))
    };
}

// --- DYNAMIC WEATHER ATMOSPHERE ---
function updateAtmosphere(data) {
    const mainCondition = data.weather[0]?.main?.toLowerCase() || "";
    const iconCode = data.weather[0]?.icon || "01d";
    const isNight = iconCode.endsWith("n");

    let weatherTheme = "clear";

    if (isNight && mainCondition === "clear") {
        weatherTheme = "clear-night";
    } else if (mainCondition.includes("cloud")) {
        weatherTheme = "clouds";
    } else if (mainCondition.includes("rain") || mainCondition.includes("drizzle")) {
        weatherTheme = "rain";
    } else if (mainCondition.includes("thunderstorm")) {
        weatherTheme = "thunderstorm";
    } else if (mainCondition.includes("snow")) {
        weatherTheme = "snow";
    } else if (mainCondition.includes("mist") || mainCondition.includes("fog") || mainCondition.includes("haze")) {
        weatherTheme = "mist";
    } else if (isNight) {
        weatherTheme = "clear-night";
    }

    document.body.setAttribute("data-weather", weatherTheme);
}

// --- UI STATE HELPERS ---
function setLoadingState(loading) {
    isLoading = loading;
    if (loading) {
        searchBtn.classList.add("loading");
        searchBtn.disabled = true;
        locationBtn.disabled = true;
    } else {
        searchBtn.classList.remove("loading");
        searchBtn.disabled = false;
        locationBtn.disabled = false;
    }
}

function showAlert(message) {
    messageEl.textContent = message;
    alertBanner.style.display = "flex";
}

function hideAlert() {
    alertBanner.style.display = "none";
    messageEl.textContent = "";
}

// --- 5-DAY TEMPERATURE TREND CHART (Chart.js 4.x) ---

/**
 * Creates vertical gradient for line dataset fill
 * @param {CanvasRenderingContext2D} ctx - Canvas 2D context
 * @param {string} startColor - CSS color at top (0%)
 * @param {string} endColor - CSS color at bottom (100%)
 * @param {number} height - Canvas area height
 * @returns {CanvasGradient}
 */
function createVerticalGradient(ctx, startColor, endColor, height = 280) {
    const gradient = ctx.createLinearGradient(0, 0, 0, height);
    gradient.addColorStop(0, startColor);
    gradient.addColorStop(1, endColor);
    return gradient;
}

/**
 * Reusable dynamic chart renderer for WeatherVibe.
 * Handles Chart.js lifecycle, prevents memory leaks, and renders curved temperature trends.
 * 
 * @param {string[]} datesArray - Array of 5 days (e.g. ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'])
 * @param {number[]} maxTempsArray - Array of 5 daily maximum temperatures (e.g. [28, 30, 26, 29, 31])
 * @param {number[]} minTempsArray - Array of 5 daily minimum temperatures (e.g. [18, 19, 17, 18, 20])
 */
function renderForecastChart(datesArray, maxTempsArray, minTempsArray) {
    const canvas = document.getElementById("tempChart");
    if (!canvas) {
        console.warn("[WeatherVibe] tempChart canvas not found.");
        return;
    }

    if (typeof Chart === "undefined") {
        console.warn("[WeatherVibe] Chart.js library is not yet loaded.");
        return;
    }

    const ctx = canvas.getContext("2d");

    // Clean up existing instance to prevent overlapping and memory leaks
    if (forecastChartInstance) {
        forecastChartInstance.destroy();
        forecastChartInstance = null;
    }

    // Prepare sleek gradients: Warm Amber for Highs, Cool Sky Blue for Lows
    const warmGradient = createVerticalGradient(
        ctx,
        "rgba(251, 146, 60, 0.45)",
        "rgba(251, 146, 60, 0.00)"
    );

    const coolGradient = createVerticalGradient(
        ctx,
        "rgba(56, 189, 248, 0.35)",
        "rgba(56, 189, 248, 0.00)"
    );

    // Dynamic scale limits with 3-degree padding
    const validTemps = [...maxTempsArray, ...minTempsArray].filter(n => typeof n === "number" && !isNaN(n));
    const minVal = validTemps.length ? Math.floor(Math.min(...validTemps) - 3) : 0;
    const maxVal = validTemps.length ? Math.ceil(Math.max(...validTemps) + 3) : 40;

    const t = I18N[currentLanguage] || I18N.en;

    forecastChartInstance = new Chart(ctx, {
        type: "line",
        data: {
            labels: datesArray,
            datasets: [
                {
                    label: t.chartHigh || "High",
                    data: maxTempsArray,
                    borderColor: "#fb923c",
                    backgroundColor: warmGradient,
                    fill: true,
                    tension: 0.4,
                    borderWidth: 3,
                    pointBackgroundColor: "#ffffff",
                    pointBorderColor: "#fb923c",
                    pointBorderWidth: 2.5,
                    pointRadius: 5,
                    pointHoverRadius: 7.5,
                    pointHoverBackgroundColor: "#fb923c",
                    pointHoverBorderColor: "#ffffff",
                    pointHoverBorderWidth: 2.5
                },
                {
                    label: t.chartLow || "Low",
                    data: minTempsArray,
                    borderColor: "#38bdf8",
                    backgroundColor: coolGradient,
                    fill: true,
                    tension: 0.4,
                    borderWidth: 2.5,
                    borderDash: [4, 4],
                    pointBackgroundColor: "#ffffff",
                    pointBorderColor: "#38bdf8",
                    pointBorderWidth: 2.5,
                    pointRadius: 4.5,
                    pointHoverRadius: 7,
                    pointHoverBackgroundColor: "#38bdf8",
                    pointHoverBorderColor: "#ffffff",
                    pointHoverBorderWidth: 2.5
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            interaction: {
                mode: "index",
                intersect: false
            },
            plugins: {
                legend: {
                    display: false // Clean custom styled header legend is used in HTML
                },
                tooltip: {
                    backgroundColor: "rgba(15, 23, 42, 0.92)",
                    titleColor: "#facc15",
                    bodyColor: "#ffffff",
                    titleFont: {
                        family: "'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif",
                        size: 13,
                        weight: "700"
                    },
                    bodyFont: {
                        family: "'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif",
                        size: 12,
                        weight: "500"
                    },
                    padding: 12,
                    cornerRadius: 12,
                    displayColors: true,
                    boxWidth: 8,
                    boxHeight: 8,
                    boxPadding: 4,
                    borderColor: "rgba(255, 255, 255, 0.15)",
                    borderWidth: 1,
                    callbacks: {
                        label: function (context) {
                            const datasetLabel = context.dataset.label || "";
                            const value = context.parsed.y;
                            return ` ${datasetLabel}: ${Math.round(value)}°C`;
                        }
                    }
                }
            },
            scales: {
                x: {
                    grid: {
                        display: false,
                        drawBorder: false
                    },
                    border: {
                        display: false
                    },
                    ticks: {
                        color: "rgba(255, 255, 255, 0.85)",
                        font: {
                            family: "'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif",
                            size: 12,
                            weight: "600"
                        },
                        padding: 8
                    }
                },
                y: {
                    min: minVal,
                    max: maxVal,
                    grid: {
                        color: "rgba(255, 255, 255, 0.08)",
                        tickLength: 0
                    },
                    border: {
                        display: false,
                        dash: [4, 4]
                    },
                    ticks: {
                        color: "rgba(255, 255, 255, 0.65)",
                        font: {
                            family: "'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif",
                            size: 11,
                            weight: "500"
                        },
                        padding: 10,
                        stepSize: 5,
                        callback: function (value) {
                            return `${value}°C`;
                        }
                    }
                }
            },
            animations: {
                tension: {
                    duration: 800,
                    easing: "easeOutQuart"
                }
            }
        }
    });
}

// =========================================================
// CITY SEARCH RECOMMENDATIONS
// Added without changing the original WeatherVibe weather logic.
// =========================================================
const citySuggestions = document.getElementById("citySuggestions");

const RECOMMENDED_CITIES = [
    { name: "Kathmandu", country: "Nepal", flag: "🇳🇵" },
    { name: "Pokhara", country: "Nepal", flag: "🇳🇵" },
    { name: "Chitwan", country: "Nepal", flag: "🇳🇵" },
    { name: "Lalitpur", country: "Nepal", flag: "🇳🇵" },
    { name: "Bhaktapur", country: "Nepal", flag: "🇳🇵" },
    { name: "Biratnagar", country: "Nepal", flag: "🇳🇵" },
    { name: "London", country: "United Kingdom", flag: "🇬🇧" },
    { name: "New York", country: "United States", flag: "🇺🇸" },
    { name: "Tokyo", country: "Japan", flag: "🇯🇵" },
    { name: "Dubai", country: "United Arab Emirates", flag: "🇦🇪" }
];

function showCitySuggestions(searchText = "") {
    if (!citySuggestions) return;

    const query = searchText.trim().toLowerCase();
    const filteredCities = RECOMMENDED_CITIES.filter(city =>
        city.name.toLowerCase().includes(query)
    );

    if (filteredCities.length === 0) {
        citySuggestions.innerHTML = `
            <div class="city-suggestion no-results">
                <div class="city-suggestion-icon">🔍</div>
                <div class="city-suggestion-info">
                    <span class="city-suggestion-name">No recommended cities</span>
                    <span class="city-suggestion-country">Press Search to search this city</span>
                </div>
            </div>
        `;
    } else {
        citySuggestions.innerHTML = filteredCities.map(city => `
            <button type="button" class="city-suggestion" data-city="${city.name}">
                <span class="city-suggestion-icon">${city.flag}</span>
                <span class="city-suggestion-info">
                    <span class="city-suggestion-name">${city.name}</span>
                    <span class="city-suggestion-country">${city.country}</span>
                </span>
            </button>
        `).join("");

        citySuggestions.querySelectorAll(".city-suggestion[data-city]").forEach(button => {
            button.addEventListener("click", () => {
                cityInput.value = button.dataset.city;
                updateClearBtnVisibility();
                hideCitySuggestions();
                searchBtn.click();
            });
        });
    }

    citySuggestions.classList.add("show");
}

function hideCitySuggestions() {
    if (citySuggestions) citySuggestions.classList.remove("show");
}

cityInput.addEventListener("focus", () => {
    showCitySuggestions(cityInput.value);
});

cityInput.addEventListener("input", () => {
    showCitySuggestions(cityInput.value);
});

document.addEventListener("click", (event) => {
    if (!event.target.closest(".search-input-wrapper")) {
        hideCitySuggestions();
    }
});
// Add this helper function to script.js
function getWeatherIconSVG(condition, isNight = false) {
    if (isNight) {
        return `
            <svg class="weather-icon-moon" width="36" height="36" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12.3 2a10 10 0 0 0 9.7 11.6 10 10 0 1 1-11.6-9.7z"/>
            </svg>
        `;
    }

    return `
        <svg class="weather-icon-sun" width="36" height="36" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="5" />
            <path stroke="currentColor" stroke-width="2" stroke-linecap="round" 
                  d="M12 2v2m0 16v2M4.93 4.93l1.41 1.41m11.32 11.32l1.41 1.41M2 12h2m16 0h2M4.93 19.07l1.41-1.41m11.32-11.32l1.41-1.41" />
        </svg>
    `;
}