var Dropzone = require('dropzone');
Dropzone.autoDiscover = false;

module.exports = 'file.uploader';

angular
  .module('file.uploader', [
    require('digger-utils-for-angular')
  ])

  .directive('fileUploader', function($http, $safeApply){
  	return {
      restrict:'EA',
      template:require('./template'),
      replace:true,
      link:function($scope, elem, $attrs){

        $scope.uploadid = $digger.littleid();

        var container_url = $scope.container.diggerwarehouse() + '/' + $scope.container.diggerid() + '/' + $scope.fieldname + '/' + $scope.uploadid;
        var base_url = $scope.base_url = $attrs.url || $digger.config.diggerurl + '/reception/files';

        $scope.file_url = base_url + container_url;

        if($scope.readonly){
          
        }
        else{

          var myDropzone = new Dropzone(elem.get(0), {
            url: $scope.file_url,
            maxFiles:1,
            uploadMultiple:false,
            addRemoveLinks:true,
            clickable:true,
            init: function() {
              this.on("sending", function(file, xhr, formdata){
                //formdata.append('containerid', $scope.container.diggerid());
                //formdata.append('warehouse', $scope.container.diggerwarehouse());
              })

              this.on("success", function(file, responseText) {
                $safeApply($scope, function(){
                  $scope.model[$scope.fieldname] = responseText;
                  $scope.processfieldname();
                  if($attrs.autoname){
                    $scope.model.name = $scope.filename;
                  }
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


