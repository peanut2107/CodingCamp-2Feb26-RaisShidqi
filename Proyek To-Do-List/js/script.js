const InputTugas = document.getElementById("InputTugas");
const InputTanggal = document.getElementById("InputTanggal");
const TombolTambah = document.getElementById("TombolTambah");
const ListTugas = document.getElementById("ListTugas");
const PesanKosong = document.getElementById("PesanKosong");

const TombolFilter = document.querySelectorAll(".tmbl-filter");
const TombolHapusSemua = document.getElementById("hapus");


document.addEventListener("DOMContentLoaded", ambilData);

function TombolTugas() {
    const Tugas = InputTugas.value;
    const Tanggal = InputTanggal.value;

    if (Tugas === "") {
        alert("Eits, isi dulu kolomnya!");
        return;
    }

    if (PesanKosong) PesanKosong.style.display = "none";

    const li = document.createElement("li");
    li.classList.add("item-tugas");

    li.innerHTML = `
        <div class="task-info">
            <strong>${Tugas}</strong>
            <br>
            <small>📅 ${Tanggal ? Tanggal : 'No Date'}</small>
        </div>
        <div class="task-actions">
            <button class="tmbl-selesai">✅</button>
            <button class="tmbl-hapus">🗑️</button>
        </div>
    `;

    ListTugas.appendChild(li);
    simpanData();

    InputTugas.value = "";
    InputTanggal.value = "";
}

TombolTambah.addEventListener("click", TombolTugas);

InputTugas.addEventListener("keypress", function(e) {
    if (e.key === "Enter") TombolTugas();
});

ListTugas.addEventListener("click", function(e) {
    const target = e.target;
    const item = target.parentElement.parentElement;

    if (target.classList.contains("tmbl-hapus")) {
        item.remove();
        cekKosong();
        simpanData();
    }

    if (target.classList.contains("tmbl-selesai")) {
        item.classList.toggle("completed");
        simpanData();
        
        const filterAktif = document.querySelector(".tmbl-filter.aktif").getAttribute("data-filter");
        jalankanFilter(filterAktif);
    }
});


TombolHapusSemua.addEventListener("click", function() {
    if (confirm("Yakin mau dihapus semuanya?")) {
        ListTugas.innerHTML = "";
        cekKosong();
        simpanData();
    }
});

TombolFilter.forEach(btn => {
    btn.addEventListener("click", function() {
        document.querySelector(".tmbl-filter.aktif").classList.remove("aktif");
        this.classList.add("aktif");

        const filterValue = this.getAttribute("data-filter");
        jalankanFilter(filterValue);
    });
});

function jalankanFilter(kategori) {
    const semuaTugas = ListTugas.children;

    for (let i = 0; i < semuaTugas.length; i++) {
        const tugas = semuaTugas[i];
        
        
        if (tugas.tagName === "P") continue;

        const sudahSelesai = tugas.classList.contains("completed");

        switch (kategori) {
            case "all":
                tugas.style.display = "flex";
                break;
            case "selesai":
                if (sudahSelesai) tugas.style.display = "flex";
                else tugas.style.display = "none";
                break;
            case "belum selesai":
                if (!sudahSelesai) tugas.style.display = "flex";
                else tugas.style.display = "none";
                break;
        }
    }
}

function cekKosong() {
    
    const jumlahTugas = ListTugas.querySelectorAll("li").length;
    
    if (jumlahTugas === 0) {
        if (PesanKosong) PesanKosong.style.display = "block";
    } else {
        if (PesanKosong) PesanKosong.style.display = "none";
    }
}

function simpanData() {
    
    localStorage.setItem("DataTugas", ListTugas.innerHTML);
}

function ambilData() {
    const dataTersimpan = localStorage.getItem("DataTugas");
    if (dataTersimpan) {
        ListTugas.innerHTML = dataTersimpan;
        cekKosong(); 
    }
}