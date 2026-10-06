document.addEventListener('DOMContentLoaded', () => {

    /* ==========================================
       1. DATA ATUAL NO FOOTER
       ========================================== */
    const dateSpan = document.getElementById('data-atual');
    if (dateSpan) {
        const hoje = new Date();
        const opcoes = { year: 'numeric', month: 'long', day: 'numeric' };
        dateSpan.textContent = hoje.toLocaleDateString('pt-BR', opcoes);
    }

    /* ==========================================
       2. LÓGICA DE MENU E SUBMENU
       ========================================== */
    const menuParents = document.querySelectorAll('.has-submenu');

    menuParents.forEach(item => {
        const link = item.querySelector('.nav-link');
        const submenu = item.querySelector('.submenu');

        link.addEventListener('click', (e) => {
            e.preventDefault();
            document.querySelectorAll('.submenu').forEach(sub => {
                if (sub !== submenu) sub.classList.remove('active');
            });
            submenu.classList.toggle('active');
        });

        item.addEventListener('mouseenter', () => submenu.classList.add('active'));
        item.addEventListener('mouseleave', () => submenu.classList.remove('active'));
    });

    document.addEventListener('click', (e) => {
        if (!e.target.closest('.has-submenu')) {
            document.querySelectorAll('.submenu').forEach(sub => sub.classList.remove('active'));
        }
    });

    /* ==========================================
       3. CADASTRO E LOGIN
       ========================================== */
    const formCadastro = document.getElementById('form-cadastro');
    if (formCadastro) {
        formCadastro.addEventListener('submit', (e) => {
            e.preventDefault();
            const nome = document.getElementById('cad-nome').value;
            const email = document.getElementById('cad-email').value;
            const senha = document.getElementById('cad-senha').value;

            localStorage.setItem('usuarioRegistrado', JSON.stringify({ nome, email, senha }));
            alert('Cadastro efetuado com sucesso! Redirecionando para a página de login...');
            window.location.href = 'login.html';
        });
    }

    const formLogin = document.getElementById('form-login');
    if (formLogin) {
        formLogin.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = document.getElementById('login-email').value;
            const senha = document.getElementById('login-senha').value;

            const usuarioSalvo = JSON.parse(localStorage.getItem('usuarioRegistrado'));

            if (usuarioSalvo && usuarioSalvo.email === email && usuarioSalvo.senha === senha) {
                localStorage.setItem('usuarioLogado', 'true');
                alert('Login efetuado com sucesso!');
                window.location.href = 'sistema.html';
            } else {
                alert('E-mail ou senha inválidos! Cadastre-se ou verifique seus dados.');
            }
        });
    }

    /* ==========================================
       4. CARRINHO DE BURGERS
       ========================================== */
    const cartList = document.getElementById('cart-list');
    const cartTotal = document.getElementById('cart-total');
    const formPedido = document.getElementById('form-pedido');
    let carrinho = [];

    const btnsAdicionar = document.querySelectorAll('.btn-add');
    btnsAdicionar.forEach(btn => {
        btn.addEventListener('click', () => {
            const nome = btn.getAttribute('data-nome');
            const preco = parseFloat(btn.getAttribute('data-preco'));

            carrinho.push({ nome, preco });
            atualizarCarrinho();
        });
    });

    function atualizarCarrinho() {
        if (!cartList) return;
        
        cartList.innerHTML = '';
        let total = 0;

        carrinho.forEach((item) => {
            total += item.preco;
            const li = document.createElement('li');
            li.innerHTML = `<span>${item.nome}</span> <span>R$ ${item.preco.toFixed(2).replace('.', ',')}</span>`;
            cartList.appendChild(li);
        });

        if (cartTotal) {
            cartTotal.textContent = total.toFixed(2).replace('.', ',');
        }
    }

    if (formPedido) {
        formPedido.addEventListener('submit', (e) => {
            e.preventDefault();
            if (carrinho.length === 0) {
                alert('Seu carrinho está vazio! Selecione ao menos um hambúrguer.');
                return;
            }
            const endereco = document.getElementById('endereco-entrega').value;
            alert(`Pedido confirmado!\nEndereço de Entrega: ${endereco}\nTotal de itens: ${carrinho.length}`);
            carrinho = [];
            atualizarCarrinho();
            formPedido.reset();
        });
    }
});