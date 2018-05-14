app.service('GenreService', ['$http', '$mdDialog', function ($http, $mdDialog) {
    console.log('GenreService has loaded');
    var self = this;

    self.genreList = {
        list: []
    };

    self.newGenre = {};

    //GET
    self.getGenre = function () {
        $http({
            method: 'GET',
            url: '/genres'
        })
            .then(function (response) {
                self.genreList.list = response.data;
                console.log('console logging genre response.data', response.data);
            })
            .catch(function (error) {
                console.log('error on getGenres GET', error);
            })
    }

    //POST
    self.addGenre = function (newGenre) {
        console.log(newGenre);
        $http({
            method: 'POST',
            url: '/genres',
            data: newGenre
        })
            .then(function (response) {
                self.getGenre();
            })
            .catch(function (error) {
                console.log('error on addGenre POST', error)
            })
    }

    //DELETE
    self.deleteGenre = function (genre) {
        if (genre.count == 0) {
            $http({
                method: 'DELETE',
                url: '/genres',
                params: genre
            })
                .then(function (response) {
                    self.getGenre();
                })
                .catch(function (error) {
                    console.log('error on deleteGenre DELETE', error)
                })
        }
        else {
            $mdDialog.show(
                $mdDialog.alert()
                    .clickOutsideToClose(true)
                    .title('Wait! You still have movies with this genre in your collection')
                    .textContent('')
                    .ariaLabel('Alert Dialog Demo')
                    .ok('Got it!')
            );
        }
    }


}])