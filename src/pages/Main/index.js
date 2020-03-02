import React, { Component } from "react";

import { FaGithubAlt, FaPlus, FaSpinner } from "react-icons/fa";

import api from "../../services/api";

import { Container, Form, SubmitButton, List } from "./styles";

export default class Main extends Component {
  state = {
    newRepo: "",
    respositories: [],
    loading: false
  };

  handleInputChange = e => {
    this.setState({ newRepo: e.target.value });
  };

  handleSubmit = async e => {
    e.preventDefault();
    this.setState({ loading: true });
    const { newRepo, respositories } = this.state;
    const response = await api.get(`/repos/${newRepo}`);
    const data = {
      name: response.data.full_name
    };
    this.setState({
      respositories: [...respositories, data],
      newRepo: "",
      loading: false
    });
  };

  render() {
    const { newRepo, respositories, loading } = this.state;
    return (
      <Container>
        <FaGithubAlt />
        <h1>Repositórios</h1>
        <Form onSubmit={this.handleSubmit}>
          <input
            type="text"
            placeholder="Adicionar repositorio"
            value={newRepo}
            onChange={this.handleInputChange}
          />
          <SubmitButton loading={loading}>
            {loading ? (
              <FaSpinner color="#FFF" size={14} />
            ) : (
              <FaPlus color="#FFF" size={14} />
            )}
          </SubmitButton>
        </Form>

        <List>
          {respositories.map(repository => (
            <li key={repository.name}>
              <span>{repository.name}</span>
              <a href="">Detalhes</a>
            </li>
          ))}
        </List>
      </Container>
    );
  }
}
