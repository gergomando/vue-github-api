export class Api {
  constructor(name) {
    this.name = name;
  }
  name() {
  	return 12
  }

	basePath(){
		return 'https://api.github.com'
	} 

	fetchUrl(url) {
    fetch(url)
      .then(res =>  {
        return res.json()
      })
      .then(function(data) {
      	let lenke = data
       return lenke
      })
      .catch(function(error) {
        console.log(error)
      })
	}

	parseUrl(url) {
    if(typeof url !== 'string')
    	return

		let parsedObject = {};

    parsedObject = url.split(', ').reduce(function (result, part) {
      var match = part.match('<(.*?)>; rel="(.*?)"')

      if (match && match.length === 3) {
        result[match[2]] = parseInt(match[1].split('&page=')[1])
      }
      return result
    }, {})

    parsedObject.prev = (parsedObject.prev || 1)

    return parsedObject
  }
}