// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('todo', ['ionic'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

.factory('Projects', function() {
  return {
    all: function() {
      var projectString = window.localStorage['projects'];
      if(projectString) {
        return angular.fromJson(projectString);
      }
      return [];
    },
    save: function(projects) {
      window.localStorage['projects'] = angular.toJson(projects);
    },
    newProject: function(projectTitle) {
      // Add a new project
      return {
        title: projectTitle,
        tasks: [{title: "temp task", selected: "false"}]
      };
    },
    getLastActiveIndex: function() {
      return parseInt(window.localStorage['lastActiveProject']) || 0;
    },
    setLastActiveIndex: function(index) {
      window.localStorage['lastActiveProject'] = index;
    }
  }
})

.controller('TodoCtrl', function($scope, $timeout, $ionicPopup, Projects, $ionicSideMenuDelegate) {

    $scope.savedGuides = [
		{
		    title: "Tokyo Mirage Sessions",
		    tasks: [
				{ title: "Reincarnation: Complete the Prologue", selected: "false" },
				{ title: "A Star is Born: Complete Ch. 1", selected: "false" },
				{ title: "That Girl was Fired: Complete Ch. 2", selected: "false" },
                { title: "Next Generation: Complete Ch. 3", selected: "false" },
                { title: "The Audition: Complete Ch. 4", selected: "false" },
                { title: "True Colors: Complete Ch. 5", selected: "false" },
                { title: "Fire Emblem: Complete Ch. 6", selected: "false" },
                { title: "Long Goodbye: Complete the story.", selected: "false" },
                { title: "Grand Finale: Get the True (Complete) Ending.", selected: "false" },
                { title: "On Your Mark: Complete 10% of the Side Stories.", selected: "false" },
                { title: "Get Set Go: Complete 50% of the Side Stories.", selected: "false" },
                { title: "Good Luck: Complete all side stories.", selected: "false" },
                { title: "Newbie Model Aoi Itsuki: Gained automatically through Ch. 2", selected: "false" },
                { title: "Backing Chorus Aoi Itsuki: Gained automatically through Ch. 3", selected: "false" },
                { title: "The New Face in Music Aoi Itsuki: Gained automatically in Ch. 5", selected: "false" },
                { title: "WINNER Aoi Itsuki: Finish a battle where Itsuki gets the last hit.", selected: "false" },
                { title: "Coordinator Aoi Itsuki: Swap Itsuki's outfit to a different one (non-DLC only).", selected: "false" },
                { title: "Radiant Star Aoi Itsuki: Get all of Itsuki's Radiant skills.", selected: "false" },
                { title: "Oribe Tsubasa ON STAGE: Gained automatically in the Prologue when Tsubasa joins.", selected: "false" },
                { title: "Handshake Pressure: Complete Tsubasa's 1st Side Story", selected: "false" },
                { title: "Open your Heart: Complete Tsubasa's 2nd Side Story", selected: "false" },
                { title: "The Wind is Tsubasa Colored: Complete Tsubasa's 3rd Side Story", selected: "false" },
                { title: "WINNER Oribe Tsubasa: Finish a battle where Tsubasa initiates the final hit/session.", selected: "false" },
                { title: "Coordinator Oribe Tsubasa: Swap outfits with Tsubasa.", selected: "false" },
                { title: "Radiant Star Oribe Tsubasa: Get all of Tsubasa's Radiant Skills.", selected: "false" },
                { title: "Birth of a Great Lord: Class change into a Great Lord.", selected: "false" },
                { title: "Birth of a Conqueror: Class change into a Conqueror.", selected: "false" },
                { title: "Skill Expert Chrom: Teach Chrom 50 different skills.", selected: "false" },
                { title: "Carnage Master Chrom: Perform 15+ Carnage Unities for Chrom", selected: "false" },
                { title: "Aggressive Power Chrom: Get a +3 weapon with Chrom.", selected: "false" },
                { title: "Assault Achievement: Visit the Dungeon at least once", selected: "false" },
                { title: "Conquest Achievement: Completely fill out the map of a dungeon, no blank spaces on the map, includes the final boss room even though it's just a cutscene", selected: "false" },
                { title: "Pillage Achievement: Open all treasure boxes, don't leave any unopened", selected: "false" },
                { title: "The Illusory World's Bad Boy: Attack 30 enemies on the overworld.", selected: "false" },
                { title: "The Illusory World's Assassin: Attack 100 enemies on the overworld.", selected: "false" },
                { title: "The Illusory World's Janitor: Attack 500 enemies on the overworld.", selected: "false" },
                { title: "Up n' Down: Go up and down the elevators in Daitama 10 times.", selected: "false" },

		    ]
		},
		{
			title: "Demon's Souls",
			tasks: [
				{ title: "Toughest Soul Trophy", selected: "false"},
				{ title: "Rogue's Trophy", selected: "false"},
				{ title: "Sage's Trophy", selected: "false"},
				{ title: "Saint's Trophy", selected: "false"},
				{ title: "Soldier's Trophy", selected: "false"},
				{ title: "World Uniter's Trophy", selected: "false"},
				{ title: "Dragon God's Trophy", selected: "false"},
				{ title: "False King's Trophy", selected: "false"},
				{ title: "Maiden Astraea's Trophy", selected: "false"},
				{ title: "Old Monk's Trophy", selected: "false"},
				{ title: "Storm King's Trophy", selected: "false"},
				{ title: "Adjudicator's Trophy", selected: "false"},
				{ title: "Armor Spider's Trophy", selected: "false"},
				{ title: "Blood Master's Trophy", selected: "false"},
				{ title: "Congratulant's Trophy", selected: "false"},
				{ title: "Darkmoon's Trophy", selected: "false"},
				{ title: "Dirty Colossus' Trophy", selected: "false"},
				{ title: "Flame Master's Trophy", selected: "false"},
				{ title: "Flamelurker's Trophy", selected: "false"},
				{ title: "Flying Dragon's Trophy", selected: "false"},
				{ title: "Fool's Idol's Trophy", selected: "false"},
				{ title: "Leechmonger's Trophy", selected: "false"},
				{ title: "Life Master's Trophy", selected: "false"},
				{ title: "Maneater's Trophy", selected: "false"},
				{ title: "Master Basher's Trophy", selected: "false"},
				{ title: "Master Bowman's Trophy", selected: "false"},
				{ title: "Master Slasher's Trophy", selected: "false"},
				{ title: "Moonlight's Trophy", selected: "false"},
				{ title: "Old Hero's Trophy", selected: "false"},
				{ title: "Old King's Trophy", selected: "false"},
				{ title: "Penetrator's Trophy", selected: "false"},
				{ title: "Phalanx's Trophy", selected: "false"},
				{ title: "Poison Master's Trophy", selected: "false"},
				{ title: "Shade Master's Trophy", selected: "false"},
				{ title: "Tower Knight's Trophy", selected: "false"},
				{ title: "Trophy of Distinction", selected: "false"},
				{ title: "Trophy of Hardness", selected: "false"},
				{ title: "Trophy of Sharpness", selected: "false"}
			]
		}
	];

  // A utility function for creating a new project
  // with the given projectTitle
  var createProject = function(projectTitle) {
    var newProject = Projects.newProject(projectTitle);
    $scope.projects.push(newProject);
    Projects.save($scope.projects);
    $scope.selectProject(newProject, $scope.projects.length-1);
  }


  // Load or initialize projects
  $scope.projects = Projects.all();

  // Grab the last active, or the first project
  $scope.activeProject = $scope.projects[Projects.getLastActiveIndex()];

  // Called to create a new project
  /*$scope.newProject = function() {
    var projectTitle = prompt('Project name');
    if(projectTitle) {
      createProject(projectTitle);
    }
  };*/
  
    // Add Game Guide to the left when clicked
  $scope.moveToUserList = function (project, index) {
      //create alert
      $scope.activeProject = project;
      $scope.projects.push(project);
      Projects.save($scope.projects);
      $scope.selectProject(project, $scope.projects.length - 1);
      $ionicSideMenuDelegate.toggleRight(false);
  };

  // Called to select the given project
  $scope.selectProject = function(project, index) {
    $scope.activeProject = project;
    Projects.setLastActiveIndex(index);
    $ionicSideMenuDelegate.toggleLeft(false);
  };

  $scope.confirmDelete = function() {
    if(!$scope.activeProject) {
      return;
    }
    
	var confirmPopup = $ionicPopup.confirm({
		title: "Delete Guide",
		template: "Are you sure you want to delete this guide?"
	});
	
	confirmPopup.then(function(res) {
		if(res) {
			$scope.projects.splice(Projects.getLastActiveIndex(),1);
			$scope.selectProject($scope.projects[0],0);
		} else{
			return;
		}
	});

    // Inefficient, but save all the projects
    Projects.save($scope.projects);

    task.title = "";
	task.selected = "false";
  };

  $scope.newTask = function() {
    $scope.taskModal.show();
  };

  $scope.closeDeleteGuide = function() {
    $scope.taskModal.hide();
  };

  $scope.toggleProjects = function() {
    $ionicSideMenuDelegate.toggleLeft();
  };
  
  $scope.updateChange = function(task) {
	  if (task.checked) {
		  task.selected = "true";
	  }
	  else {
		  task.selected = "false";
	  }
	  
	  Projects.save($scope.projects);
  }


  // Try to create the first project, make sure to defer
  // this by using $timeout so everything is initialized
  // properly
  /*$timeout(function() {
    if($scope.projects.length == 0) {
      while(true) {
        var projectTitle = prompt('Your first project title:');
        if(projectTitle) {
          createProject(projectTitle);
          break;
        }
      }
    }
  }, 1000);*/

})
