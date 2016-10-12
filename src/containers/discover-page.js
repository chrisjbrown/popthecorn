import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Divider from 'material-ui/Divider';
import RaisedButton from 'material-ui/RaisedButton';
import CircularProgress from 'material-ui/CircularProgress';
import {GridList, GridTile} from 'material-ui/GridList';
import Slider from 'material-ui/Slider';

import {
  removeError,
  discoverMovieRequest,
  genresRequest,
} from 'app/actions/';

import Container from 'app/components/container';

const API_KEY = __API_KEY__;

class DiscoverPage extends Component {

  static propTypes = {
    discover: PropTypes.object,
    genreData: PropTypes.object,
    config: PropTypes.object,
    discoverMovieRequest: PropTypes.func,
    genresRequest: PropTypes.func,
  };

  constructor(props) {
    super(props);

    this.state = {
      voteSlider: 5,
      selectedGenres: [],
      voteCountSlider: 200,
    };
  }

  componentDidMount() {
    this.props.discoverMovieRequest();
    this.props.genresRequest();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState !== this.state) {
      this.handleDiscoverRequest();
    }
  }

  renderError() {
    return (
      <strong> Error requesting item list </strong>
    );
  }

  renderLoading() {
    return (
      <div className="center">
        <CircularProgress size={ 1.5 }  />
      </div>
    );
  }

  renderGenres() {
    const { genreData } = this.props;
    const isLoading = genreData.get('isLoading');
    const dataError = genreData.get('dataError');
    const genres = genreData.get('items');
    const { selectedGenres } = this.state;

    if (isLoading) {
      return this.renderLoading();
    } else if (dataError) {
      return this.renderError();
    }

    return (
      <div className="flex-wrap center">
        <div className="my2">
          {genres.map((genre, i) => (
            <RaisedButton
              key={ i }
              label={ genre.get('name') }
              onTouchTap={ this.handleSelectGenre.bind(this, genre.get('id')) }
              primary= { selectedGenres.includes(genre.get('id')) }
              className="m1"
            />
          ))}
        </div>
        <div className="my2">
          <RaisedButton
            label="Clear Genres"
            onTouchTap={ this.handleClearGenres.bind(this) }
          />
        </div>
        <Divider className="my2" />
        <div className="mx4">
          <span className="center-align">
            vote average greater than: { this.state.voteSlider }
          </span>
          <Slider
            min={ 0 }
            max={ 10 }
            defaultValue={ 5 }
            value={this.state.voteSlider}
            onChange={this.handleVoteSlider.bind(this)}
          />
        </div>
        <Divider className="my2" />
        <div className="mx4">
          <span className="center-align">
            vote count greater than: { this.state.voteCountSlider }
          </span>
          <Slider
            min={ 0 }
            max={ 5000 }
            defaultValue={ 200 }
            value={this.state.voteCountSlider}
            onChange={this.handleVoteCountSlider.bind(this)}
          />
        </div>
      </div>
    );
  }

  renderMovieGrid() {
    const { config, discover } = this.props;
    const isLoading = discover.get('isLoading');
    const dataError = discover.get('dataError');
    const disoverResults = discover.get('items');
    const baseUrl = config.getIn(['images', 'secure_base_url'], '');
    const posterSizes = config.getIn(['images', 'poster_sizes', 4], '');

    if (isLoading) {
      return this.renderLoading();
    } else if (dataError) {
      return this.renderError();
    }

    return (
      <GridList cols={ 6 } cellHeight={ 300 }>
        {disoverResults.map((result, i) => (
          <GridTile
            key={ i }
            title={result.get('title')}
            subtitle={<span>{result.get('overview')}</span>}
          >
            <img src={baseUrl + posterSizes + result.get('poster_path') + '?api_key=' + API_KEY } />
          </GridTile>
        ))}
      </GridList>
    );
  }

  render() {
    return (
      <Container center>
        { this.renderGenres() }
        <div className="m2 flex-wrap justify-between">
          { this.renderMovieGrid() }
        </div>
      </Container>
    );
  }

  handleClearGenres() {
    this.setState({
      selectedGenres: [],
    });
  }

  handleVoteSlider(event, value) {
    this.setState({
      voteSlider: value,
    });
  }

  handleVoteCountSlider(event, value) {
    this.setState({
      voteCountSlider: value,
    });
  }

  handleSelectGenre(genreName) {
    const { selectedGenres } = this.state;

    if (selectedGenres.includes(genreName)) {
      const newGenres = selectedGenres.filter((genre) => {
        return genre !== genreName;
      });

      this.setState({
        selectedGenres: newGenres,
      });

      return;
    }

    selectedGenres.push(genreName);

    this.setState({
      selectedGenres: selectedGenres,
    });
  }

  handleDiscoverRequest() {
    const { selectedGenres, voteSlider, voteCountSlider } = this.state;

    this.props.discoverMovieRequest({
      with_genres: selectedGenres.join(','),
      'vote_average.gte': voteSlider,
      'vote_count.gte': voteCountSlider,
    });
  }
}

export default connect(
  state => ({
    discover: state.discover,
    genreData: state.genres,
    config: state.config,
    form: state.form,
  }),
  dispatch => bindActionCreators({ removeError, discoverMovieRequest, genresRequest }, dispatch)
)(DiscoverPage);
