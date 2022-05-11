window.onload = function () {
    let img_files = [
        "./images/bener1.jpg",
        "./images/benner3.jpg",
        "./images/benner4.jpg"
    ];
    let img_files2 = [
        "./images/benner2.jpeg",
        "./images/benner2.jpg",
        "./images/benner5.jpg"
    ];
    let img_files3 = [
        "./images/bener1.jpg",
        "./images/benner3.jpg",
        "./images/benner4.jpg"
    ];
    let img_files4 = [
        "./images/benner2.jpeg",
        "./images/benner2.jpg",
        "./images/benner5.jpg"
    ];
    let div_img = document.getElementById("banner_left");
    let div_img2 = document.getElementById("banner_right");
    let div_img3 = document.getElementById("m_benner_top");
    let div_img4 = document.getElementById("m_benner_bottom");
    let i = 0;

    function fn_change_img() {
        console.log("i:::::", i);
        div_img.style.backgroundImage = "url(" + img_files[i] + ")";
        div_img2.style.backgroundImage = "url(" + img_files2[i] + ")";
        div_img3.style.backgroundImage = "url(" + img_files3[i] + ")";
        div_img4.style.backgroundImage = "url(" + img_files4[i] + ")";
        if (i == 2) {
            i = 0;
        } else {
            i++;
        }
        div_img.style.transitionDuration = "2s";
        div_img2.style.transitionDuration = "2s";
        div_img3.style.transitionDuration = "2s";
        div_img4.style.transitionDuration = "2s";
    }

    setInterval(function () {
        fn_change_img();
    }, 3700);
}