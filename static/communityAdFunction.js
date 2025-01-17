import { getDoc, updateDoc, setDoc, doc } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-firestore.js";
import { adViewsDB } from "/static/firebaseConfig.js";

async function incrementAdViewCount(ad) {
    try {
        const docSnap = await getDoc(adViewsDB);
        const data = docSnap.data();

        // Check if the ad view count exists, if not, create it with initial value of 0
        if (!data || !data[ad]) {
            // Initialize the ad view count if it doesn't exist
            await updateDoc(adViewsDB, { [ad]: 1 }, { merge: true });
            console.log(`Created a new ad view count for ${ad}.`);
        }

        // Increment the counter by 1
        if (data && data[ad]) {
            await updateDoc(adViewsDB, {
                [ad]: data[ad] + 1
            })
        };
        console.log(`Incremented view count for ${ad}.`);

    } catch (error) {
        console.error("Error updating ad analytics data: ", error);
    }
}

document.addEventListener('DOMContentLoaded', function() {
    sleep(500);
    // List of current ads and the links to their image and redirect link
    const ads = [
        {
            name: "ad1-cibplush-shameless-plug",
            link: "https://ciblesgd.junipercreates.com/channel/UC4STm5KlYBHfn_bA6bjsYjQ/p/7485001924799",
            imgSrc: "/CiblesSMP/assets/ads/ad1-cibplush-shameless-plug.png"
        },
        {
            name: "ad2-nhe-recruitment",
            link: "https://discord.com/channels/1266454488265392179/1277804478216540180",
            imgSrc: "/CiblesSMP/assets/ads/ad2-nhe-recruitment.png"
        },
        {
            name: "ad3-crackshack-banners",
            link: "https://discord.com/channels/1266454488265392179/1278060398804865195",
            imgSrc: "/CiblesSMP/assets/ads/ad3-crackshack-banners.png"
        },
        {
            name: "ad4-crackshack-hiring",
            link: "https://discord.com/channels/1266454488265392179/1278060398804865195",
            imgSrc: "/CiblesSMP/assets/ads/ad4-crackshack-hiring.png"
        },
        {
            name: "ad5-inkadia-recruitment",
            link: "https://discord.com/channels/1266454488265392179/1277804478216540180",
            imgSrc: "/CiblesSMP/assets/ads/ad5-inkadia-recruitment.png"
        },
        {
            name: "ad6-sirenisia-recruitment",
            link: "https://discord.com/channels/1266454488265392179/1277804478216540180",
            imgSrc: "/CiblesSMP/assets/ads/ad6-sirenisia-recruitment.png"
        },
        {
            name: "ad7-nimbus-recruitment",
            link: "https://discord.com/channels/1266454488265392179/1278775530006511647",
            imgSrc: "/CiblesSMP/assets/ads/ad7-nimbus-recruitment.png"
        }
    ];

    // Check if ads are disabled
    const adsDisabled = getCookie('adsDisabled') === 'true';

    if (!adsDisabled) {
        // Shuffle the ads
        const shuffledAds = ads.sort(() => 0.5 - Math.random());

        // Get all ad areas
        const adAreas = document.querySelectorAll(".adArea");

        if (adAreas.length === 0) {
            throw new Error("No ad areas found.");
        }

        // Assign ads to ad areas
        adAreas.forEach((adArea, index) => {
            if (index < shuffledAds.length) {
                const ad = shuffledAds[index];
                incrementAdViewCount(ad.name);
                adArea.innerHTML = `
                    <div class="sponsored-label">
                        Community Ad
                        &nbsp;-&nbsp;
                        <span class="hover-element">
                            <span class="link">Learn More</span>
                            <span class="tooltip-text">Community ads are cute little ads made by members of the SMP's community. They are made to advertize things like nations, shops, and sometimes cibles merch.<br><br><u>Cibles</u> and <u>Z</u> <strong style="color: white;">DO NOT</strong> recieve any kind of <u>monetary compensation</u> for showing these ads, and you can submit your own in the SMP Community server.<br><br>Keeping these enabled supports the community's work they put into making these ads and shows you fun things going on in the server. However, you can disable the ads if you absolutely want to, it's your loss :P.<br><br><button class="disable-ads">Disable Ads</button></span>
                        </span>
                    </div>
                    <a href="${ad.link}" target="_blank">
                        <img src="${ad.imgSrc}" alt="ADVERTISEMENT">
                    </a>`;
            } else {
                adArea.innerHTML = "<p>No ads available.</p>";
            }
        });

        // Buttons to disable ads
        document.querySelectorAll('.disable-ads').forEach(button => {
            button.addEventListener('click', () => {
                setCookie('adsDisabled', 'true', 30);
                location.reload();
            });
        });

        console.log("Ads successfully loaded.");
    } else {
        // Inserts a notice that ads are disabled
        const adAreas = document.querySelectorAll(".adArea");
        adAreas.forEach(adArea => {
            adArea.innerHTML = `<p>
                                    Community ads are disabled
                                    &nbsp;-&nbsp;
                                    <span class="hover-element">
                                        <span class="link">Learn More</span>
                                        <span class="tooltip-text">Community ads are cute little ads made by members of the SMP's community. They are made to advertize things like nations, shops, and sometimes cibles merch.<br><br><u>Cibles</u> and <u>Z</u> <strong style="color: white;">DO NOT</strong> recieve any kind of <u>monetary compensation</u> for showing these ads, and you can submit your own in the SMP Community server.<br><br>Keeping these enabled supports the community's work they put into making these ads and shows you fun things going on in the server. However, you can disable the ads if you absolutely want to, it's your loss :P.<br><br><button class="enable-ads">Enable them to support the community</button></span>
                                    </span>
                                </p>`;
        });

        // Button to enable ads
        document.querySelectorAll('.enable-ads').forEach(button => {
            button.addEventListener('click', () => {
                setCookie('adsDisabled', 'false'); 
                location.reload(); 
            });
        });

        console.log("Ads are disabled, please enable them to support the community and see some funny ads.")
    }
});
