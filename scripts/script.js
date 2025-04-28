
const livros = [
    {
        id: 1,
        titulo: "Dom Quixote",
        autor: "Miguel de Cervantes",
        ano: 1605,
        editora: "Editora Clássicos",
        genero: "Romance",
        descricao: "Um romance satírico sobre um fidalgo que acredita ser um cavaleiro andante.",
        imagem: "https://m.media-amazon.com/images/I/81pdXbEIZhL._UF894,1000_QL80_.jpg"
    },
    {
        id: 2,
        titulo: "1984",
        autor: "George Orwell",
        ano: 1949,
        editora: "Companhia das Letras",
        genero: "Distopia",
        descricao: "Um retrato sombrio de um futuro totalitário.",
        imagem: "https://m.media-amazon.com/images/I/612ADI+BVlL._AC_UF1000,1000_QL80_.jpg"
    },
    {
        id: 3,
        titulo: "A Revolução dos Bichos",
        autor: "George Orwell",
        ano: 1945,
        editora: "Editora B",
        genero: "Fábula política",
        descricao: "Uma alegoria sobre o totalitarismo disfarçado de fábula animal.",
        imagem: "https://m.media-amazon.com/images/I/91BsZhxCRjL.jpg"
    },
    {
        id: 4,
        titulo: "O Pequeno Príncipe",
        autor: "Antoine de Saint-Exupéry",
        ano: 1943,
        editora: "Agir",
        genero: "Infantil/Filosófico",
        descricao: "Um conto filosófico com críticas sociais sutis.",
        imagem: "https://m.media-amazon.com/images/I/81SVIwe5L9L._UF894,1000_QL80_.jpg"
    },
    {
        id: 5,
        titulo: "Orgulho e Preconceito",
        autor: "Jane Austen",
        ano: 1813,
        editora: "Penguin",
        genero: "Romance",
        descricao: "A história de Elizabeth Bennet enquanto lida com questões de classe e amor.",
        imagem: "https://m.media-amazon.com/images/I/81gOkEhzgIL._UF894,1000_QL80_.jpg"
    },
    {
        id: 6,
        titulo: "O Hobbit",
        autor: "J.R.R. Tolkien",
        ano: 1937,
        editora: "HarperCollins",
        genero: "Fantasia",
        descricao: "A jornada de Bilbo Bolseiro em uma aventura pela Terra Média.",
        imagem: "https://m.media-amazon.com/images/I/91M9xPIf10L._AC_UF1000,1000_QL80_.jpg"
    },
    {
        id: 7,
        titulo: "Moby Dick",
        autor: "Herman Melville",
        ano: 1851,
        editora: "Nova Fronteira",
        genero: "Aventura",
        descricao: "A obsessiva caçada do capitão Ahab pela baleia branca.",
        imagem: "https://m.media-amazon.com/images/I/71K4OH9CqOL._UF894,1000_QL80_.jpg"
    },
    {
        id: 8,
        titulo: "A Metamorfose",
        autor: "Franz Kafka",
        ano: 1915,
        editora: "L&PM",
        genero: "Ficção filosófica",
        descricao: "Um homem acorda transformado em um inseto gigante.",
        imagem: "https://m.media-amazon.com/images/I/71mFnG3Bn3L._AC_UF1000,1000_QL80_.jpg"
    },
    {
        id: 9,
        titulo: "Grande Sertão: Veredas",
        autor: "João Guimarães Rosa",
        ano: 1956,
        editora: "Nova Aguilar",
        genero: "Romance",
        descricao: "Um clássico da literatura brasileira sobre o sertão e seus conflitos.",
        imagem: "https://m.media-amazon.com/images/I/81NtboFZziL._AC_UF1000,1000_QL80_.jpg"
    },
    {
        id: 10,
        titulo: "Harry Potter e a Pedra Filosofal",
        autor: "J.K. Rowling",
        ano: 1997,
        editora: "Rocco",
        genero: "Fantasia",
        descricao: "O começo da jornada de um jovem bruxo em Hogwarts.",
        imagem: "https://m.media-amazon.com/images/I/81q77Q39nEL.jpg"
    }
];


if (!localStorage.getItem('locacoes')) {
    localStorage.setItem('locacoes', JSON.stringify([]));
}

// Carregar livros na tela
function carregarLivros() {
    const container = document.getElementById('livros-container');
    if (!container) return;

    container.innerHTML = '';
    livros.forEach(livro => {
        const card = document.createElement('div');
        card.className = 'livro-card';
        card.innerHTML = `
          <img src="${livro.imagem}" alt="${livro.titulo}" class="livro-imagem">
          <h3>${livro.titulo}</h3>
          <p><strong>Autor:</strong> ${livro.autor}</p>
          <p><strong>Ano:</strong> ${livro.ano}</p>
          <button onclick="abrirModalDetalhes(${livro.id})">Ver Detalhes</button>
      `;
        container.appendChild(card);
    });
}


function abrirModalDetalhes(idLivro) {
    const livro = livros.find(l => l.id === idLivro);
    if (!livro) return;

    const locacoes = JSON.parse(localStorage.getItem('locacoes'));
    const locado = locacoes.some(locacao => locacao.livro === livro.titulo);

    document.getElementById('modal-titulo').innerText = livro.titulo;
    document.getElementById('modal-body').innerHTML = `
      <img src="${livro.imagem}" alt="${livro.titulo}" class="modal-imagem">
      <p><strong>Autor:</strong> ${livro.autor}</p>
      <p><strong>Ano:</strong> ${livro.ano}</p>
      <p><strong>Editora:</strong> ${livro.editora}</p>
      <p><strong>Gênero:</strong> ${livro.genero}</p>
      <p><strong>Descrição:</strong> ${livro.descricao}</p>
  `;

    if (locado) {
        document.getElementById('status-alugado').innerText = 'Este livro já está alugado.';
        document.getElementById('btn-locar').style.display = 'none';
    } else {
        document.getElementById('status-alugado').innerText = 'Este livro não está alugado.';
        document.getElementById('btn-locar').style.display = 'block';
    }

    document.getElementById('modal-detalhes').style.display = 'block';
}

// Fechar modais
document.querySelectorAll('.close').forEach(btn => {
    btn.onclick = () => {
        document.getElementById('modal-detalhes').style.display = 'none';
        document.getElementById('modal-locacao').style.display = 'none';
    };
});

const btnLocar = document.getElementById('btn-locar');
if (btnLocar) {
    btnLocar.onclick = () => {
        document.getElementById('modal-detalhes').style.display = 'none';
        document.getElementById('modal-locacao').style.display = 'block';
    };
}

const formLocacao = document.getElementById('form-locacao');
if (formLocacao) {
    formLocacao.addEventListener('submit', function (e) {
        e.preventDefault();

        const locacoes = JSON.parse(localStorage.getItem('locacoes'));
        const novaLocacao = {
            livro: document.getElementById('livro-titulo').value,
            locatario: document.getElementById('locatario').value,
            cpf: document.getElementById('cpf').value,
            dataLocacao: document.getElementById('data-locacao').value,
            dataDevolucao: document.getElementById('data-devolucao').value
        };
        locacoes.push(novaLocacao);
        localStorage.setItem('locacoes', JSON.stringify(locacoes));

        alert('Locação registrada com sucesso!');
        document.getElementById('modal-locacao').style.display = 'none';
        this.reset();
    });
}


function carregarLocacoes() {
    const tabela = document.querySelector('#tabela-locacoes tbody');
    if (!tabela) return;

    tabela.innerHTML = '';
    const locacoes = JSON.parse(localStorage.getItem('locacoes'));
    locacoes.forEach(locacao => {
        const linha = document.createElement('tr');
        linha.innerHTML = `
          <td>${locacao.livro}</td>
          <td>${locacao.locatario}</td>
          <td>${locacao.cpf}</td>
          <td>${locacao.dataLocacao}</td>
          <td>${locacao.dataDevolucao}</td>
      `;
        tabela.appendChild(linha);
    });
}


document.addEventListener('DOMContentLoaded', () => {
    carregarLivros();
    carregarLocacoes();
});