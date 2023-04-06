import PropTypes from 'prop-types';
import React, { Component } from 'react';

class Form extends Component {
  render() {
    const {
      cardName,
      cardDescription,
      cardAttr1,
      cardAttr2,
      cardAttr3,
      cardImage,
      cardRare,
      cardTrunfo,
      hasTrunfo,
      isSaveButtonDisabled,
      onInputChange,
      onSaveButtonClick,
    } = this.props;
    return (
      <form>
        <label htmlFor="cardName">
          Nome da Carta:
          <input
            type="text"
            data-testid="name-input"
            id="cardName"
            name="cardName"
            value={ cardName }
            onChange={ onInputChange }
          />
        </label>
        <label htmlFor="cardDescription">
          Descrição da Carta:
          <textarea
            name="cardDescription"
            id="cardDescription"
            cols="50"
            rows="3"
            data-testid="description-input"
            value={ cardDescription }
            onChange={ onInputChange }
          />
        </label>
        <label htmlFor="cardAttr1">
          Atributo 1:
          <input
            type="number"
            data-testid="attr1-input"
            id="cardAttr1"
            name="cardAttr1"
            value={ cardAttr1 }
            onChange={ onInputChange }
          />
        </label>
        <label htmlFor="cardAttr2">
          Atributo 2:
          <input
            type="number"
            data-testid="attr2-input"
            id="cardAttr2"
            name="cardAttr2"
            value={ cardAttr2 }
            onChange={ onInputChange }
          />
        </label>
        <label htmlFor="cardAttr3">
          Atributo 3:
          <input
            type="number"
            data-testid="attr3-input"
            id="cardAttr3"
            name="cardAttr3"
            value={ cardAttr3 }
            onChange={ onInputChange }
          />
        </label>
        <label htmlFor="cardImage">
          Imagem da Carta:
          <input
            type="text"
            data-testid="image-input"
            id="cardImage"
            name="cardImage"
            value={ cardImage }
            onChange={ onInputChange }
          />
        </label>
        <label htmlFor="cardRare">
          Raridade da Carta:
          <select
            name="cardRare"
            id="cardRare"
            data-testid="rare-input"
            value={ cardRare }
            onChange={ onInputChange }
          >
            <option value="normal">normal</option>
            <option value="raro">raro</option>
            <option value="muito raro">muito raro</option>
          </select>
        </label>
        {
          hasTrunfo
            ? (
              <span>Você já tem um Super Trunfo em seu baralho</span>
            )
            : (
              <label htmlFor="cardTrunfo">
                É o Super Trunfo?
                <input
                  data-testid="trunfo-input"
                  type="checkbox"
                  name="cardTrunfo"
                  id="cardTrunfo"
                  checked={ cardTrunfo }
                  onChange={ onInputChange }
                />
              </label>
            )
        }
        <button
          data-testid="save-button"
          disabled={ isSaveButtonDisabled }
          onClick={ onSaveButtonClick }
        >
          Salvar
        </button>
      </form>
    );
  }
}

Form.propTypes = {
  cardName: PropTypes.string,
  cardDescription: PropTypes.string,
  cardAttr1: PropTypes.string,
  cardAttr2: PropTypes.string,
  cardAttr3: PropTypes.string,
  cardImage: PropTypes.string,
  cardRare: PropTypes.string,
  cardTrunfo: PropTypes.bool,
  hasTrunfo: PropTypes.bool,
  isSaveButtonDisabled: PropTypes.bool,
  onInputChange: PropTypes.func,
  onSaveButtonClick: PropTypes.func,
}.isRequired;

export default Form;
