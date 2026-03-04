<template>
<div class="p-9">
    <img 
        class="w-full max-w-[360px] h-auto mb-4 win-border "
        src="@/assets/Biography/self.jpg" 
    />
    <h2 class="font-bold text-2xl py-5">Jorge Bobrek</h2>
    <h4 class="text-gray-600 font-medium text-xs" style="padding-bottom: 10px">
        iOS Developer
    </h4>
    <h4 class="text-gray-600 font-medium text-xs">Colombia 📍</h4>

    <div class="flex flex-wrap mt-5 gap-2 items-center">
        <img class="w-auto h-5 rounded-none text-xs" alt="Swift" src="https://img.shields.io/badge/-Swift-orange" />
        <img class="w-auto h-5 rounded-none text-xs" alt="SwiftUI" src="https://img.shields.io/badge/-SwiftUI-3e8bc3" />
        <img class="w-auto h-5 rounded-none text-xs" alt="Git" src="https://img.shields.io/badge/-Git-critical" />
    </div>

    <div class="pt-7">
        <h3 class="font-bold text-md pb-1">About Me</h3>
        <p class="font-thin text-sm pb-2.5">
            I’m a {{ new Date().getFullYear() - 1998 }} year old systems engineer with more than five years of experience in mobile application development, specialized in the creation of native solutions for both iOS and Android platforms. With experience specifically in the banking and retail sectors, delivering reliable and high-quality applications.
        </p>
    </div>

    <div class="pt-7">
        <h3 class="font-bold text-md pb-1">Work Experience</h3>
    </div>

    <section class="pt-6">
        <h4 class="text-lg font-semibold">Kranio</h4>
        <p class="text-gray-600 text-xs">iOS Developer • Mar. 2025 – Present</p>
        <p class="text-gray-700 text-xs">Toke</p>
        <ul class="list-disc pl-5 mt-2 space-y-1 text-sm font-thin">
            <li>Led the initial development of “PinkApp”, proposing a clean architecture ready to scale with the project's growth.</li>
            <li>Guided the team in adopting best development practices and provided ongoing support to junior developers to enhance their skills.</li>
            <li>Supervised and validated the team's work, maintaining development quality and fostering a collaborative environment.</li>
        </ul>
    </section>

    <section class="pt-6">
        <h4 class="text-lg font-semibold">Pragma</h4>
        <p class="text-gray-600 text-xs">iOS Developer • Mar. 2022 – Jun. 2024 </p>
        <p class="text-gray-700 text-xs">Éxito Group</p>
        <ul class="list-disc pl-5 mt-2 space-y-1 text-sm font-thin">
            <li>Provided ongoing support and maintenance for Éxito and Carulla mobile applications, ensuring optimal performance and a seamless user experience for thousands of daily active users, increasing the average app rating from 3.9 to 4.7.</li>
            <li>Implemented price checker functionality, which allows users to use apps to complement the shopping experience in physical stores. Users can scan products to check prices and keep track of the total amount of their purchases.</li>
            <li>Developed a specialized meat cutting and preparation module, which enriched the customer experience by offering customized product options.</li>
            <li>Created a ratings and reviews system in the product detail page, allowing users to rate products using a star rating system. They can also leave reviews which, along with the ratings, can be consulted by other users, improving the shopping experience.</li>
            <li>Modified the app’s products architecture to include a color picker feature for beauty products, allowing the user to more easily buy specific items and providing the possibility of future scalability to add more variations in other product categories.</li>
            <li>Introduced event logging through Firebase Analytics, giving the client better insight into which parts of the app have the most user interaction and helping make decisions on how to drive users to other less used features, resulting in an 130% increase in sales through the app.</li>
        </ul>
    </section>

    <section class="pt-6">
        <h4 class="text-lg font-semibold">World Pos Solutions</h4>
        <p class="text-gray-600 text-xs">Android Developer • Mar. 2022 – Jun. 2024</p>
        <p class="text-gray-700 text-xs">Linkser</p>
        <ul class="list-disc pl-5 mt-2 space-y-1 text-sm font-thin">
            <li>Led the maintenance and continuous improvement of the banking application for NewPOS devices (6210, 7210, 8210, 9220), responsible for managing approximately 100,000 credit cards and 3 million debit cards across the country, processing more than 25 million per year.</li>
            <li>Implemented Diners card reading functionality, giving the end-user more payment options when using our devices, being the first electronic card and payment method processor of the Discover Group in Bolivia.</li>
            <li>Designed an innovative solution for payment with mobile wallets and QR, allowing the company to issue a proprietary card for use within Bolivia, contributing to a more efficient and modernized payment experience for end-users.</li>
        </ul>
        <p class="text-gray-700 text-xs">Lesly Center</p>
        <ul class="list-disc pl-5 mt-2 space-y-1 text-sm font-thin">
            <li>Generation and printing of detailed reports to provide the end-user more detailed information about their bets, which improved operational efficiency and user satisfaction.</li>
        </ul>
    </section>

    <div class="pt-10">
        <h3 class="font-bold text-md pb-1">Projects & Achievements</h3>
    </div>

    <div class="pt-7">
        <div>
            <h3 class="pb-1"><b>HelloHand</b></h3>
            <p class="text-gray-600 text-xs">2026</p>
            <p class="font-thin text-sm">
                An interactive video game for language learning through multilingual vocabulary matching
            </p>
            <p class="font-thin text-sm pb-2.5">
                Check out the live demo
                <a style="color: #0000FF" href="/hellohand/" class="underline">here</a>!
            </p>
        </div>
    </div>

    <div class="pt-7">
        <h3 class="pb-1"><b>Résumé</b></h3>
        <a style="color: #0000FF" href="/files/jorge_bobrek_resume.pdf" class="underline font-thin text-sm pb-2.5">Check out my résumé here.</a>
    </div>
</div>
</template>