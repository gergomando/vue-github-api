export class Api {
 	constructor(params) {
		this.basePath = params.basePath
  	this.user = params.user
  	this.paginationQuery = new String()
  	this.urlParams = {}
  }

	routeMap() {
		return {
			userRepositories : '/users/' + this.user.name + '/repos',
			userRepo :  '/repos/' + this.user.name + '/' + this.urlParams.repoName
		}
	}

	set pagination(newValue) {
		if(!newValue)
			this.paginationQuery = ''

		if(typeof newValue === 'object')
			this.paginationQuery = '?per_page='+ newValue.limit + '&page=' + newValue.current
	}

	makeUrl(type) {
		return this.basePath + this.routeMap()[type] + this.paginationQuery
	}

	parseHeader(url) {
    if(typeof url !== 'string')
    	return

		let parsedObject = {};

    parsedObject = url.split(', ').reduce(function (result, part) {
      let match = part.match('<(.*?)>; rel="(.*?)"')

      if (match && match.length === 3) {
        result[match[2]] = parseInt(match[1].split('&page=')[1])
      }
      return result
    }, {})

    parsedObject.prev = (parsedObject.prev || 1)

    return parsedObject
  }

	fetchUrl(url) {
		let self = this
    fetch(url)
      .then(res =>  {
        return res.json()
      })
      .then(function(data) {
      	self.resource = data
      })
      .catch(function(error) {
        console.log(error)
      })
	}

}