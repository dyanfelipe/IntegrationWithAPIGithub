import React, { Component } from "react";
import api from "../../services/api";

export default class Repository extends Component {
  constructor(props) {
    super(props);
    this.state = {
      repository: {},
      issues: [],
      loading: true
    };
  }

  async componentDidMount() {
    const { match } = this.props;

    const repoName = decodeURIComponent(match.params.repository);
    const [repository, issues] = await Promise.all([
      api.get(`/repos/${repoName}`),
      api.get(`/repos/${repoName}/issues`, {
        state: "open",
        per_page: 5
      })
    ]);
    console.log(repository, "aqui foi", issues);
  }

  render() {
    const { repository, issues, loading } = this.state;
    return <div>Repository</div>;
  }
}
