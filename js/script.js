window.onload = function(){
    setTimeout(() => {
        const loader = document.getElementById("loader");
        if(loader){
            loader.style.opacity = "0";
            setTimeout(() => {
                loader.style.display = "none";
            }, 500);
        }
    }, 1200);

    AOS.init();
    updateSlider();
};

/* ================= PROJECT SLIDER ================= */
let currentSlide = 0;
const totalSlides = 6;

function updateSlider(){
    const track = document.getElementById("sliderTrack");
    if(!track) return;
    const slideWidth = track.children[0] ? track.children[0].offsetWidth : 0;
    currentTranslate = -(currentSlide * slideWidth);
    prevTranslate = currentTranslate;
    track.style.transform = "translateX(" + currentTranslate + "px)";
}

function nextSlide(){
    if(currentSlide < totalSlides - 1){
        currentSlide++;
        updateSlider();
    }
}

function prevSlide(){
    if(currentSlide > 0){
        currentSlide--;
        updateSlider();
    }
}

window.addEventListener("resize", updateSlider);

/* ================= DRAG SLIDER ================= */
let isDragging = false;
let startPos = 0;
let currentTranslate = 0;
let prevTranslate = 0;
let animationID;
let dragMoved = false;

const sliderContainer = document.querySelector(".slider-container");
const sliderTrack = document.getElementById("sliderTrack");

if(sliderContainer && sliderTrack){
    sliderContainer.addEventListener("mousedown", dragStart);
    sliderContainer.addEventListener("touchstart", dragStart);

    sliderContainer.addEventListener("mouseup", dragEnd);
    sliderContainer.addEventListener("mouseleave", dragEnd);
    sliderContainer.addEventListener("touchend", dragEnd);

    sliderContainer.addEventListener("mousemove", drag);
    sliderContainer.addEventListener("touchmove", drag);

    sliderContainer.addEventListener("contextmenu", e => e.preventDefault());
}

function dragStart(e){
    isDragging = true;
    dragMoved = false;
    startPos = getPositionX(e);
    animationID = requestAnimationFrame(animation);
    sliderContainer.style.cursor = "grabbing";
    sliderTrack.style.transition = "none";
}

function drag(e){
    if(!isDragging) return;
    const currentPosition = getPositionX(e);
    const diff = currentPosition - startPos;
    if(Math.abs(diff) > 5){
        dragMoved = true;
    }
    currentTranslate = prevTranslate + diff;
}

function dragEnd(){
    isDragging = false;
    cancelAnimationFrame(animationID);
    sliderContainer.style.cursor = "grab";
    sliderTrack.style.transition = "transform 0.4s ease";

    const slideWidth = sliderTrack.children[0] ? sliderTrack.children[0].offsetWidth : 0;
    const movedBy = currentTranslate - prevTranslate;

    if(movedBy < -50 && currentSlide < totalSlides - 1){
        currentSlide++;
    } else if(movedBy > 50 && currentSlide > 0){
        currentSlide--;
    }

    updateSlider();
}

function getPositionX(e){
    return e.type.includes("mouse") ? e.pageX : e.touches[0].clientX;
}

function animation(){
    if(isDragging){
        sliderTrack.style.transform = "translateX(" + currentTranslate + "px)";
        requestAnimationFrame(animation);
    }
}

function setSliderPosition(){
    sliderTrack.style.transform = "translateX(" + currentTranslate + "px)";
}

/* ================= PROJECT DATA ================= */
const projectData = [
    {
        title: "Luxora Olshop",
        stack: "PHP Native, MySQL, HTML, CSS, JavaScript",
        desc: "E-Commerce sederhana berbasis PHP Native yang dilengkapi sistem manajemen produk, keranjang belanja, checkout, upload gambar produk, serta sistem order dan transaksi.",
        features: [
            "CRUD Produk (Create, Read, Update, Delete)",
            "Keranjang & Checkout",
            "Upload Gambar Produk",
            "Sistem Order & Transaksi",
            "Manajemen stok barang"
        ]
    },
    {
        title: "Raff Food & Cake",
        stack: "Laravel 12, MySQL, Midtrans, Bootstrap",
        desc: "Aplikasi E-Commerce UMKM makanan & kue dengan sistem pembayaran online terintegrasi Midtrans Payment Gateway.",
        features: [
            "Sistem Payment Gateway (Midtrans)",
            "Dashboard Admin lengkap",
            "Status Pesanan & Pembayaran real-time",
            "Manajemen produk & kategori",
            "Laporan penjualan"
        ]
    },
    {
        title: "Finance Dashboard",
        stack: "React.js, Node.js, Express.js, MongoDB",
        desc: "Dashboard keuangan modern untuk manajemen data keuangan pribadi atau bisnis kecil dengan tampilan interaktif.",
        features: [
            "Manajemen data keuangan (pemasukan & pengeluaran)",
            "API Integration",
            "UI modern & interaktif dengan Chart.js",
            "Filter & search data",
            "Export laporan"
        ]
    },
    {
        title: "Website Peminjaman Barang",
        stack: "Laravel 12, MySQL, Blade, Bootstrap",
        desc: "Sistem informasi peminjaman barang untuk instansi atau sekolah dengan autentikasi multi-role.",
        features: [
            "Sistem peminjaman & pengembalian barang",
            "Login & autentikasi multi user",
            "Manajemen data user & barang",
            "Notifikasi status peminjaman",
            "Riwayat peminjaman"
        ]
    },
    {
        title: "Website Toko Buku",
        stack: "HTML, CSS, JavaScript (Vanilla)",
        desc: "Website katalog toko buku statis yang responsive dengan fitur pencarian dan filter kategori.",
        features: [
            "Sistem Search Barang real-time",
            "Fitur Filter Kategori",
            "Desain Responsive (Mobile Friendly)",
            "Keranjang belanja sederhana (localStorage)",
            "Animasi halus dengan CSS"
        ]
    },
    {
        title: "Sistem Absensi Siswa",
        stack: "PHP Native / Laravel, MySQL",
        desc: "Aplikasi absensi digital untuk sekolah yang mendukung multi user (Admin & Siswa) dengan rekap otomatis.",
        features: [
            "Login Multi User (Admin & Siswa)",
            "Absensi Harian (Hadir, Izin, Alpha, Sakit)",
            "Rekap Data Absensi per bulan & semester",
            "Export data ke PDF/Excel",
            "Notifikasi keterlambatan"
        ]
    }
];

function openProjectModal(index){
    if(dragMoved){
        dragMoved = false;
        return;
    }
    const data = projectData[index];
    if(!data) return;

    document.getElementById("projectModalTitle").innerText = data.title;

    let featuresHtml = "";
    for(let i = 0; i < data.features.length; i++){
        featuresHtml += "<li>" + data.features[i] + "</li>";
    }

    document.getElementById("projectModalBody").innerHTML =
        "<p><b>Tech Stack:</b> " + data.stack + "</p>" +
        "<p style='margin-top:12px;'>" + data.desc + "</p>" +
        "<ul>" + featuresHtml + "</ul>";

    document.getElementById("projectModal").classList.add("show");
}

function closeProjectModal(){
    document.getElementById("projectModal").classList.remove("show");
}

function toggleMenu(){
    const menu = document.getElementById("navMenu");
    if(menu) menu.classList.toggle("active");
}

function kirimEmail(){
    const nama = document.getElementById("nama").value.trim();
    const email = document.getElementById("email").value.trim();
    const pesan = document.getElementById("pesan").value.trim();

    const btn = document.getElementById("btnKirim");
    const status = document.getElementById("statusMsg");

    if(nama === "" || email === "" || pesan === ""){
        status.innerHTML = "❌ Harap isi semua field!";
        status.style.color = "red";
        return;
    }

    btn.classList.add("loading");
    btn.innerText = "Mengirim";
    btn.disabled = true;

    setTimeout(() => {
        const subject = encodeURIComponent("Pesan dari Portfolio");
        const body = encodeURIComponent(
            "Nama: " + nama + "\n" +
            "Email: " + email + "\n" +
            "Pesan: " + pesan
        );

        window.location.href = "mailto:nabillkysn@gmail.com?subject=" + subject + "&body=" + body;

        btn.classList.remove("loading");
        btn.innerText = "Kirim";
        btn.disabled = false;

        status.innerHTML = "✅ Email siap dikirim!";
        status.style.color = "#22c55e";
    }, 1000);
}

function openCV(){
    const modal = document.getElementById("cvModal");
    if(modal) modal.classList.add("show");
}

function closeCV(){
    const modal = document.getElementById("cvModal");
    if(modal) modal.classList.remove("show");
}

window.onclick = function(e){
    const cvModal = document.getElementById("cvModal");
    const projectModal = document.getElementById("projectModal");
    if(e.target === cvModal){
        cvModal.classList.remove("show");
    }
    if(e.target === projectModal){
        projectModal.classList.remove("show");
    }
};

function downloadCV(){
    const link = document.createElement("a");
    link.href = "CV-Nabil-Al-Kaysan.pdf";
    link.download = "CV-Nabil-Al-Kaysan.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

