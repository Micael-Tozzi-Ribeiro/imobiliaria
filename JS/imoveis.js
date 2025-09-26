// ==================== DARK MODE ====================
const themeToggleButtons = document.querySelectorAll('[data-bs-theme-value]');
const themeIconUse = document.querySelector('.theme-icon-active use');

const icons = {
    light: "#sun-fill",
    dark: "#moon-stars-fill",
    auto: "#circle-half"
};

function setTheme(theme) {
    document.documentElement.setAttribute('data-bs-theme', theme);

    themeToggleButtons.forEach(btn => {
        const svgCheck = btn.querySelector('svg.ms-auto');
        if (svgCheck) svgCheck.classList.add('d-none');
    });

    const activeCheck = document.querySelector(`[data-bs-theme-value="${theme}"] svg.ms-auto`);
    if (activeCheck) activeCheck.classList.remove('d-none');

    if (themeIconUse) {
        try {
            themeIconUse.setAttribute('href', icons[theme]);
        } catch (e) {
            themeIconUse.setAttributeNS('http://www.w3.org/1999/xlink', 'href', icons[theme]);
        }
    }
}

// ==================== CARROSSEL POR CARD ====================
document.querySelectorAll('.card-imovel').forEach(card => {
    const imgs = card.querySelectorAll('.carousel-img');
    const dots = card.querySelectorAll('.dot');
    const prev = card.querySelector('.prev');
    const next = card.querySelector('.next');
    let current = 0;

    function showSlide(index) {
        imgs.forEach((img, i) => img.classList.toggle('active', i === index));
        dots.forEach((dot, i) => dot.classList.toggle('active', i === index));
        current = index;
    }

    prev.addEventListener('click', () => {
        let nextIndex = (current - 1 + imgs.length) % imgs.length;
        showSlide(nextIndex);
    });

    next.addEventListener('click', () => {
        let nextIndex = (current + 1) % imgs.length;
        showSlide(nextIndex);
    });

    dots.forEach((dot, i) => dot.addEventListener('click', () => showSlide(i)));

    // Autoplay
    setInterval(() => {
        let nextIndex = (current + 1) % imgs.length;
        showSlide(nextIndex);
    }, 5000);
});

// ==================== MODAL DE IMAGEM ====================
const cardImgs = document.querySelectorAll('.card-img img');
const modal = document.getElementById('imgModal');
const modalImg = document.getElementById('modalImg');
const closeModal = document.getElementById('closeModal');

cardImgs.forEach(img => {
    img.addEventListener('click', () => {
        modal.style.display = 'flex';
        modalImg.src = img.src;
    });
});

closeModal.addEventListener('click', () => modal.style.display = 'none');

modal.addEventListener('click', (e) => {
    if (e.target === modal) modal.style.display = 'none';
});

// Seleção de elementos
const filterButtons = document.querySelectorAll(".pill");
const selectEstado = document.querySelector(".sort");
const limparBtn = document.querySelector(".limpar");
const cards = document.querySelectorAll(".card-imovel");
const counter = document.getElementById("counter");
const searchInput = document.querySelector(".buscar"); // se quiser busca por nome do imóvel

// Função para atualizar a galeria
function updateGallery() {
    const filtroTipo = document.querySelector(".pill[aria-pressed='true']")?.dataset.filter || "tudo";
    const filtroEstado = selectEstado.value.toLowerCase();
    const searchText = searchInput ? searchInput.value.toLowerCase() : "";

    let totalVisiveis = 0;

    cards.forEach(card => {
        const tipo = card.dataset.tipo.toLowerCase();
        const estado = card.dataset.estado.toLowerCase();
        const titulo = card.querySelector("h3").textContent.toLowerCase();

        const mostrarTipo = filtroTipo === "tudo" || tipo === filtroTipo;
        const mostrarEstado = filtroEstado === "todos" || estado === filtroEstado;
        const mostrarBusca = !searchText || titulo.includes(searchText);

        if (mostrarTipo && mostrarEstado && mostrarBusca) {
            card.classList.remove("hidden");
            totalVisiveis++;
        } else {
            card.classList.add("hidden");
        }
    });

    counter.textContent = totalVisiveis;
}

// Eventos dos botões tipo "pill"
filterButtons.forEach(btn => {
    btn.addEventListener("click", () => {
        filterButtons.forEach(b => b.setAttribute("aria-pressed", "false"));
        btn.setAttribute("aria-pressed", "true");
        updateGallery();
    });
});

// Evento do select de estado
selectEstado.addEventListener("change", updateGallery);

// Evento de busca (opcional)
if (searchInput) searchInput.addEventListener("input", updateGallery);

// Evento do botão limpar
limparBtn.addEventListener("click", () => {
    filterButtons.forEach(b => b.setAttribute("aria-pressed", "false"));
    document.querySelector(".pill[data-filter='tudo']").setAttribute("aria-pressed", "true");
    selectEstado.value = "todos";
    if (searchInput) searchInput.value = "";
    updateGallery();
});

// Inicializar contador
updateGallery();
