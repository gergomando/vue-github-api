'use strict';

export class ParseLink {
	parse(link) {
		let parsedObject = {};
      
    parsedObject = link.split(', ').reduce(function (result, part) {
      var match = part.match('<(.*?)>; rel="(.*?)"')

      if (match && match.length === 3) {
        result[match[2]] = parseInt(match[1].split('&page=')[1])
      }
      return result
    }, {})

    parsedObject.prev = parsedObject.prev ? parsedObject.prev : 1

    return parsedObject
	}
}
