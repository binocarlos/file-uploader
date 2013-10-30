var template = require('./template');
var Dropzone = require('dropzone');

$digger.directive('fileUploader', function($http, $safeApply){
	return {
    restrict:'EA',
    template:template,
    replace:true,
    controller:function($scope){

			
    },

    link:function($scope, elem, $attrs){

      $scope.uploadid = $digger.littleid();
      $scope.uploadurl = $digger.config.diggerurl + '/reception/files/upload'

      if($scope.readonly){
        console.log('-------------------------------------------');
        console.log('-------------------------------------------');
        console.log('READF ONLYT');
      }
      else{
        var myDropzone = new Dropzone(elem.get(0), {
          url: $digger.config.diggerurl + '/reception/files/upload',
          maxFiles:1,
          uploadMultiple:false,
          addRemoveLinks:true,
          clickable:true,
          headers:{
            'x-container-id':$scope.container.diggerid(),
            'x-warehouse':$scope.container.diggerwarehouse(),
            'x-upload-id':$scope.uploadid
          },
          init: function() {
            this.on("success", function(file, responseText) {
              $safeApply($scope, function(){
                $scope.model[$scope.fieldname] = $scope.fileurl = $digger.config.baseurl + '/reception/files' + responseText;
                $scope.processfieldname();
              })
            });
          }
        });
      }


      $scope.processfieldname = function(){
        var url = $scope.model[$scope.fieldname];
        if(url){
          var parts = url.split('/');
          $scope.filename = parts.pop();
        }
      }

      $scope.processfieldname();
    	
    }
  }
})

Dropzone.autoDiscover = false;
module.exports = '<file-uploader />';
