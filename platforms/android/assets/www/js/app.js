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
				{ title: "Reincarnation:", subtitle: "Complete the Prologue", selected: "false" },
				{ title: "A Star is Born:", subtitle: "Complete Ch. 1", selected: "false" },
				{ title: "That Girl was Fired:", subtitle: "Complete Ch. 2", selected: "false" },
                { title: "Next Generation:", subtitle: "Complete Ch. 3", selected: "false" },
                { title: "The Audition:", subtitle: "Complete Ch. 4", selected: "false" },
                { title: "True Colors:", subtitle: "Complete Ch. 5", selected: "false" },
                { title: "Fire Emblem:", subtitle: "Complete Ch. 6", selected: "false" },
                { title: "Long Goodbye:", subtitle: "Complete the story.", selected: "false" },
                { title: "Grand Finale:", subtitle: "Get the True (Complete) Ending.", selected: "false" },
                { title: "On Your Mark:", subtitle: "Complete 10% of the Side Stories.", selected: "false" },
                { title: "Get Set Go:", subtitle: "Complete 50% of the Side Stories.", selected: "false" },
                { title: "Good Luck:", subtitle: "Complete all side stories.", selected: "false" },
                { title: "Newbie Model Aoi Itsuki:", subtitle: "Gained automatically through Ch. 2", selected: "false" },
                { title: "Backing Chorus Aoi Itsuki:", subtitle: "Gained automatically through Ch. 3", selected: "false" },
                { title: "The New Face in Music Aoi Itsuki:", subtitle: "Gained automatically in Ch. 5", selected: "false" },
                { title: "WINNER Aoi Itsuki:", subtitle: "Finish a battle where Itsuki gets the last hit.", selected: "false" },
                { title: "Coordinator Aoi Itsuki:", subtitle: "Swap Itsuki's outfit to a different one (non-DLC only).", selected: "false" },
                { title: "Radiant Star Aoi Itsuki:", subtitle: "Get all of Itsuki's Radiant skills.", selected: "false" },
                { title: "Oribe Tsubasa ON STAGE:", subtitle: "Gained automatically in the Prologue when Tsubasa joins.", selected: "false" },
                { title: "Handshake Pressure:", subtitle: "Complete Tsubasa's 1st Side Story", selected: "false" },
                { title: "Open your Heart:", subtitle: "Complete Tsubasa's 2nd Side Story", selected: "false" },
                { title: "The Wind is Tsubasa Colored:", subtitle: "Complete Tsubasa's 3rd Side Story", selected: "false" },
                { title: "WINNER Oribe Tsubasa:", subtitle: "Finish a battle where Tsubasa initiates the final hit/session.", selected: "false" },
                { title: "Coordinator Oribe Tsubasa:", subtitle: "Swap outfits with Tsubasa.", selected: "false" },
                { title: "Radiant Star Oribe Tsubasa:", subtitle: "Get all of Tsubasa's Radiant Skills.", selected: "false" },
                { title: "Birth of a Great Lord:", subtitle: "Class change into a Great Lord.", selected: "false" },
                { title: "Birth of a Conqueror:", subtitle: "Class change into a Conqueror.", selected: "false" },
                { title: "Skill Expert Chrom:", subtitle: "Teach Chrom 50 different skills.", selected: "false" },
                { title: "Carnage Master Chrom:", subtitle: "Perform 15+ Carnage Unities for Chrom", selected: "false" },
                { title: "Aggressive Power Chrom:", subtitle: "Get a +3 weapon with Chrom.", selected: "false" },
                { title: "Assault Achievement:", subtitle: "Visit the Dungeon at least once", selected: "false" },
                { title: "Conquest Achievement:", subtitle: "Completely fill out the map of a dungeon, no blank spaces on the map, includes the final boss room even though it's just a cutscene", selected: "false" },
                { title: "Pillage Achievement:", subtitle: "Open all treasure boxes, don't leave any unopened", selected: "false" },
                { title: "The Illusory World's Bad Boy:", subtitle: "Attack 30 enemies on the overworld.", selected: "false" },
                { title: "The Illusory World's Assassin:", subtitle: "Attack 100 enemies on the overworld.", selected: "false" },
                { title: "The Illusory World's Janitor:", subtitle: "Attack 500 enemies on the overworld.", selected: "false" },
                { title: "Up n' Down:", subtitle: "Go up and down the elevators in Daitama 10 times.", selected: "false" },

		    ]
		},
		{
			title: "Demon's Souls",
			tasks: [
				{ title: "Toughest Soul Trophy", subtitle: "All Trophies Obtained", selected: "false"},
				{ title: "Rogue's Trophy", subtitle: "All Rings Obtained", selected: "false"},
				{ title: "Sage's Trophy", subtitle: "All Spells Learned", selected: "false"},
				{ title: "Saint's Trophy", subtitle: "All Miracles Learned", selected: "false"},
				{ title: "Soldier's Trophy", subtitle: "All Unique Weapons Obtained", selected: "false"},
				{ title: "World Uniter's Trophy", subtitle: "Old One Put to Sleep & World United", selected: "false"},
				{ title: "Dragon God's Trophy", subtitle: "Slayer of Demon “Dragon God”", selected: "false"},
				{ title: "False King's Trophy", subtitle: "Slayer of Demon “False King”", selected: "false"},
				{ title: "Maiden Astraea's Trophy", subtitle: "Slayer of Demon “Maiden Astraea”", selected: "false"},
				{ title: "Old Monk's Trophy", subtitle: "Slayer of Demon “Old Monk”", selected: "false"},
				{ title: "Storm King's Trophy", subtitle: "Slayer of Demon “Storm King”", selected: "false"},
				{ title: "Adjudicator's Trophy", subtitle: "Slayer of Demon “Adjudicator”", selected: "false"},
				{ title: "Armor Spider's Trophy", subtitle: "Slayer of Demon “Armor Spider”", selected: "false"},
				{ title: "Blood Master's Trophy", subtitle: "Obtained Best Weapon by Suckerstone", selected: "false"},
				{ title: "Congratulant's Trophy", subtitle: "Obtained Best Weapon by Faintstone", selected: "false"},
				{ title: "Darkmoon's Trophy", subtitle: "Obtained Best Weapon by Darkmoonstone", selected: "false"},
				{ title: "Dirty Colossus' Trophy", subtitle: "Slayer of Demon “Dirty Colossus”", selected: "false"},
				{ title: "Flame Master's Trophy", subtitle: "Obtained Best Weapon by Dragonstone", selected: "false"},
				{ title: "Flamelurker's Trophy", subtitle: "Slayer of Demon “Flamelurker”", selected: "false"},
				{ title: "Flying Dragon's Trophy", subtitle: "Slayer of Demon “Blue Flying Dragon”", selected: "false"},
				{ title: "Fool's Idol's Trophy", subtitle: "Slayer of Demon “Fool's Idol”", selected: "false"},
				{ title: "Leechmonger's Trophy", subtitle: "Slayer of Demon “Leechmonger”", selected: "false"},
				{ title: "Life Master's Trophy", subtitle: "Obtained Best Weapon by Marrowstone", selected: "false"},
				{ title: "Maneater's Trophy", subtitle: "Slayer of Demon “Maneater”", selected: "false"},
				{ title: "Master Basher's Trophy", subtitle: "Obtained Best Weapon by Greystone", selected: "false"},
				{ title: "Master Bowman's Trophy", subtitle: "Obtained Best Bow by Spiderstone", selected: "false"},
				{ title: "Master Slasher's Trophy", subtitle: "Obtained Best Weapon by Bladestone", selected: "false"},
				{ title: "Moonlight's Trophy", subtitle: "Obtained Best Weapon by Moonlightstone", selected: "false"},
				{ title: "Old Hero's Trophy", subtitle: "Slayer of Demon “Old Hero”", selected: "false"},
				{ title: "Old King's Trophy", subtitle: "Conqueror of Old King Doran", selected: "false"},
				{ title: "Penetrator's Trophy", subtitle: "Slayer of Demon “Penetrator”", selected: "false"},
				{ title: "Phalanx's Trophy", subtitle: "Slayer of Demon “Phalanx”", selected: "false"},
				{ title: "Poison Master's Trophy", subtitle: "Obtained Best Weapon by Mercurystone", selected: "false"},
				{ title: "Shade Master's Trophy", subtitle: "Obtained Best Weapon by Cloudstone", selected: "false"},
				{ title: "Tower Knight's Trophy", subtitle: "Slayer of Demon “Tower Knight”", selected: "false"},
				{ title: "Trophy of Distinction", subtitle: "Obtained Best Weapon by Clearstone", selected: "false"},
				{ title: "Trophy of Hardness", subtitle: "Obtained Best Weapon by Hardstone", selected: "false"},
				{ title: "Trophy of Sharpness", subtitle: "Obtained Best Weapon by Sharpstone", selected: "false"}
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
