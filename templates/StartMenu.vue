<template>
<div class="menu" style="z-index: 1000000">
    <div class="sidebar">
        <img class="sidebar-image" src="@/assets/sidebar-image.png" />
    </div>
    <div class="socials">
        <a href="https://www.linkedin.com/in/jorge-bobrek" target="_blank">
            <div class="bar">
                <img class="social-image" src="@/assets/iPhone-Icons/Linkedin.webp" />
                <u>L</u>inkedIn
            </div>
        </a>
        <a href="https://github.com/jorge-bobrek" target="_blank">
            <div class="bar">
                <img class="social-image" src="@/assets/iPhone-Icons/Github.webp" />
                <u>G</u>itHub
            </div>
        </a>
        <div class="bottom-section">
            <div class="divider"></div>
            <a href="/files/jorge_bobrek_resume.pdf" target="_blank">
                <div class="bar">
                    <img class="social-image" src="@/assets/win95Icons/resume.png" />
                    <u>R</u>ésumé
                </div>
            </a>
        </div>
    </div>
</div>
</template>

  
<style scoped>
.menu {
    width: 165px;
    height: 242px;
    background: black;
    background: rgb(195, 195, 195);
    overflow: hidden;
    border-top: solid rgb(250, 250, 250) 2px;
    border-left: solid rgb(250, 250, 250) 2px;
    border-right: solid rgb(90, 90, 90) 1.5px;
    border-bottom: solid rgb(90, 90, 90) 1.5px;
    box-shadow: 1.5px 1.5px black;
    max-height: 100%;
    max-width: 100%;
    outline: rgb(222, 222, 222) 1px solid;
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    font-size: 12px;
}

a {
    color: black;
    text-decoration: none;
}

.sidebar {
    width: 25px;
    background: rgb(123, 125, 123);
    height: 100%;
    display: flex;
    align-items: flex-end;
}

.sidebar-image {
    width: 100%;
}

@media only screen and (max-width: 600px) {
    .sidebar {
        width: 25px;
        background: rgb(123, 125, 123);
        height: 100%;
        display: flex;
        align-items: flex-end;
    }
}

.bottom-section {
    margin-top: auto;
}

.divider {
    margin-top: auto;
    width: 100%;
    height: 1px;
    background: rgb(123, 125, 123);
    border-bottom: white solid 1px;
}

.socials {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    height: 100%;
}

.social-image {
    width: 30px;
    height: 30px;
    margin-right: 10px;
    border-radius: 6px;
}

.bar {
    display: flex;
    flex-direction: row;
    padding: 5px 10px 5px 10px;
    align-items: center;
}

.bar:hover {
    background: rgb(0, 0, 118);
    color: white;
}
</style>
