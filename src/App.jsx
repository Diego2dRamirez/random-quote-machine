import React from "react";

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      author: '',
      quote: ''
    }
  }
  newQuote = () => {
    fetch('https://api.breakingbadquotes.xyz/v1/quotes')
      .then(res => res.json())
      .then(data => {
        this.setState({
          author: data[0].author,
          quote: data[0].quote
        })
      })
      .catch(error => console.error('Error', error))
  }
  getTweetUrl = () => {
    const { quote, author } = this.state;
    return `https://twitter.com/intent/tweet?text="${encodeURIComponent(quote)}" - ${encodeURIComponent(author)}`;
  };
  componentDidMount() {
    this.newQuote()
  }
  render() {
    return (
      <main id="quote-box">
        <p id="text">{this.state.quote}</p>
        <p id="author">{this.state.author}</p>
        <div className="buttons">
          <a
            href={this.getTweetUrl()}
            id="tweet-quote"
            target="_blank"
            rel="noopener noreferrer">
            Tweet
          </a>
          <button id="new-quote" onClick={this.newQuote}>new quote</button>
        </div>
      </main>
    )
  }
}

export default App;