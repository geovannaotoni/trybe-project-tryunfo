import React from 'react';
import Form from './components/Form';
import Card from './components/Card';

class App extends React.Component {
  state = {
    cardName: '',
    cardDescription: '',
    cardAttr1: '0',
    cardAttr2: '0',
    cardAttr3: '0',
    cardImage: '',
    cardRare: 'normal',
    cardTrunfo: false,
    isSaveButtonDisabled: true,
    createdCards: [],
    hasTrunfo: false,
    filterCardName: '',
    filterCardRare: 'todas',
    filterCardTrunfo: false,
  };

  // Função que recebe os valores escrito nos campos e salva no state
  handleChange = ({ target }) => {
    const { name, value, type } = target;
    // Após alterar o estado, chama a função que verificará os erros.
    this.setState({
      [name]: type === 'checkbox' ? target.checked : value,
    }, this.verifyFields);
  };

  // Função que realiza a verificação dos campos
  verifyFields = () => {
    const {
      cardName,
      cardDescription,
      cardImage,
      cardRare,
      cardAttr1,
      cardAttr2,
      cardAttr3,
    } = this.state;

    const maxCardPoint = 90;
    const maxPoints = 210;

    // Verifica se algum campo não está preenchido ou preenchido incorretamente. Se não estiver, traz true, indicando que há um erro.
    const errorCases = [
      !cardName.length, // !0 = true
      !cardDescription.length,
      !cardImage.length,
      !cardRare.length,
      Number(cardAttr1) > maxCardPoint || Number(cardAttr1) < 0,
      Number(cardAttr2) > maxCardPoint || Number(cardAttr2) < 0,
      Number(cardAttr3) > maxCardPoint || Number(cardAttr3) < 0,
      Number(cardAttr1) + Number(cardAttr2) + Number(cardAttr3) > maxPoints,
    ];

    // verifica se todos os elementos são false (ou seja, se não há erros). Se sim, o formulario está preenchido corretamente e a HOF every retorna true.
    const formComplete = errorCases.every((elem) => elem === false);

    // Habilita o botão se o formulário estiver preenchido corretamente
    this.setState({
      isSaveButtonDisabled: !formComplete,
    });
  };

  // Função que salva o novo card criado no state na chave createdCards
  handleClick = (event) => {
    event.preventDefault();
    const {
      cardName,
      cardDescription,
      cardImage,
      cardRare,
      cardAttr1,
      cardAttr2,
      cardAttr3,
      cardTrunfo,
    } = this.state;

    // cria um novo objeto com todas as informações da carta
    const newCard = {
      cardName,
      cardDescription,
      cardImage,
      cardRare,
      cardAttr1,
      cardAttr2,
      cardAttr3,
      cardTrunfo,
    };

    // salva o novo objeto em createdCards e reseta os demais states
    this.setState((prevState) => ({
      cardName: '',
      cardDescription: '',
      cardAttr1: '0',
      cardAttr2: '0',
      cardAttr3: '0',
      cardImage: '',
      cardRare: 'normal',
      hasTrunfo: prevState.hasTrunfo === true ? true : prevState.cardTrunfo,
      cardTrunfo: false,
      isSaveButtonDisabled: true,
      createdCards: [...prevState.createdCards, newCard],
    }));
  };

  // Função que deleta o card criado a partir do index passado como parâmetro
  handleDelete = (event, index) => {
    event.preventDefault();
    const { createdCards } = this.state;
    createdCards.splice(index, 1);
    this.setState({
      createdCards: [...createdCards],
      hasTrunfo: createdCards.some(({ cardTrunfo }) => cardTrunfo === true),
    });
  };

  render() {
    const { state } = this;
    return (
      <>
        <h1>Tryunfo</h1>
        <main>
          <Form
            cardName={ state.cardName }
            cardDescription={ state.cardDescription }
            cardAttr1={ state.cardAttr1 }
            cardAttr2={ state.cardAttr2 }
            cardAttr3={ state.cardAttr3 }
            cardImage={ state.cardImage }
            cardRare={ state.cardRare }
            cardTrunfo={ state.cardTrunfo }
            onInputChange={ this.handleChange }
            isSaveButtonDisabled={ state.isSaveButtonDisabled }
            onSaveButtonClick={ (event) => this.handleClick(event) }
            hasTrunfo={ state.hasTrunfo }
          />
          <div className="card-preview-container">
            <h3>Pré-Visualização</h3>
            <Card
              cardName={ state.cardName }
              cardDescription={ state.cardDescription }
              cardAttr1={ state.cardAttr1 }
              cardAttr2={ state.cardAttr2 }
              cardAttr3={ state.cardAttr3 }
              cardImage={ state.cardImage }
              cardRare={ state.cardRare }
              cardTrunfo={ state.cardTrunfo }
            />
          </div>
        </main>
        <div>
            <h2>Todas as Cartas Criadas</h2>
          <aside>
            <label htmlFor="filterCardName">
              Pesquise as cartas:
              <input
                type="text"
                value={ state.filterCardName }
                onChange={ this.handleChange }
                id="filterCardName"
                name="filterCardName"
                data-testid="name-filter"
                placeholder="Nome da Carta"
                disabled={ state.filterCardTrunfo }
              />
            </label>
            <label htmlFor="filterCardRare">
              <select
                data-testid="rare-filter"
                id="filterCardRare"
                name="filterCardRare"
                onChange={ this.handleChange }
                disabled={ state.filterCardTrunfo }
              >
                <option value="todas">todas</option>
                <option value="normal">normal</option>
                <option value="raro">raro</option>
                <option value="muito raro">muito raro</option>
              </select>
            </label>
            <label htmlFor="filterCardTrunfo">
              Trunfo
              <input
                data-testid="trunfo-filter"
                type="checkbox"
                id="filterCardTrunfo"
                name="filterCardTrunfo"
                onChange={ this.handleChange }
              />
            </label>
          </aside>
          <section>
            {
              state.createdCards
                .filter(({ cardName }) => cardName.includes(state.filterCardName))
                .filter(({ cardRare }) => {
                  if (state.filterCardRare === 'todas') return true;
                  return cardRare === state.filterCardRare;
                })
                .filter(({ cardTrunfo }) => {
                  if (state.filterCardTrunfo === false) return true;
                  return cardTrunfo === true;
                })
                .map((card, index) => (
                  <div key={ index } id="createdCard-container">
                    <Card
                      cardName={ card.cardName }
                      cardDescription={ card.cardDescription }
                      cardAttr1={ card.cardAttr1 }
                      cardAttr2={ card.cardAttr2 }
                      cardAttr3={ card.cardAttr3 }
                      cardImage={ card.cardImage }
                      cardRare={ card.cardRare }
                      cardTrunfo={ card.cardTrunfo }
                    />
                    <button
                      data-testid="delete-button"
                      id="card-delete-button"
                      onClick={ (event) => this.handleDelete(event, index) }
                    >
                      Excluir
                    </button>
                  </div>
                ))
            }
          </section>
        </div>
      </>
    );
  }
}

export default App;
