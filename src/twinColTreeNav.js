(function () {
  'use strict';

  angular.module('twinColTreeNav', [])
    .directive('twinColTreeNav', function () {
      return {
        template: template,
        restrict: 'EA',
        scope: {
          treeData: '='
        },
        controller: function ($scope) {
          $scope.treeData.atSelectTreeNode = $scope.treeData.atSelectTreeNode || function () {
          };
          $scope.treeData.getChildren = $scope.treeData.getChildren || function () {
            return [];
          };
          $scope.treeData.hasChildren = $scope.treeData.hasChildren || function () {
            return false;
          };

          function getParent(curBreadCrumb, breadCrumbElem) {
            if (curBreadCrumb) {
              for (var i = 0; i < curBreadCrumb.length; i++) {
                if (curBreadCrumb[i] === breadCrumbElem) {
                  return i > 0 && curBreadCrumb[i - 1] || undefined;
                }
              }
            } else {
              return undefined;
            }
          }

          function updatedBreadCrumb(curBreadCrumb, treeNode, appendChild, rebuildBreadCrumb) {
            var newBreadCrumb = [];
            if (rebuildBreadCrumb) {
              // Reset bread crumb, i.e. find the point where the tree node is in the bread crumb
              for (var i = 0; i < curBreadCrumb.length; i++) {
                newBreadCrumb.push(curBreadCrumb[i]);
                if (curBreadCrumb[i] === treeNode) {
                  return newBreadCrumb;
                }
              }
            } else if (appendChild) {
              // Just append the new tree node
              for (var i = 0; i < curBreadCrumb.length; i++) {
                newBreadCrumb.push(curBreadCrumb[i]);
              }
              newBreadCrumb.push(treeNode);
              return newBreadCrumb;
            } else {
              // the new root is a sibling to the previous root replace last element
              for (var i = 0; i < curBreadCrumb.length; i++) {
                newBreadCrumb.push(curBreadCrumb[i]);
              }
              newBreadCrumb.pop();
              newBreadCrumb.push(treeNode);
              return newBreadCrumb;
            }
          }

          $scope.currentRoots = $scope.treeData.getChildren();

          $scope.childrenOfSelectedRoot = [];

          $scope.breadCrumb = [];

          $scope.hasChildren = function (treeNode) {
            return $scope.treeData.hasChildren(treeNode);
          };

          $scope.selectBreadCrumbElement = function (breadCrumbElem) {
            var siblings = $scope.treeData.getChildren(getParent($scope.breadCrumb, breadCrumbElem));
            $scope.selectChild(breadCrumbElem, siblings, true);
          };

          $scope.selectRoot = function selectRoot(root, appendChild, rebuildBreadCrumb) {
            $scope.breadCrumb = updatedBreadCrumb($scope.breadCrumb, root, appendChild, rebuildBreadCrumb);
            $scope.childrenOfSelectedRoot = $scope.treeData.getChildren(root);
            $scope.treeData.atSelectTreeNode(root);
          };

          $scope.selectChild = function selectChild(child, siblings, rebuildBreadCrumb) {
            if ($scope.hasChildren(child)) {
              $scope.currentRoots = siblings;
              $scope.selectRoot(child, true, rebuildBreadCrumb);
            }
            $scope.treeData.atSelectTreeNode(child);
          };

          var initialChildren = $scope.treeData.getChildren();
          var firstChild = initialChildren && initialChildren.length > 0 && initialChildren[0];
          $scope.selectChild(firstChild, initialChildren);
        },
        link: function postLink(scope, element, attrs) {
        }
      };
    });

  var template =
    '<div class="twin-col-tree-nav">' +
    '  <!-- Bread crumb -->' +
    '  <div class="bread-crumb">' +
    '    <span ng-repeat="elem in breadCrumb" class="bread-crumb-elem">' +
    '      <a ng-click="selectBreadCrumbElement(elem)">' +
    '        {{elem.name}}<span ng-if="hasChildren(elem)"> &#9658;</span>' +
    '      </a>' +
    '    </span>' +
    '  </div>' +
    '  <!-- twin col -->' +
    '  <div class="twin-cols">' +
    '    <!-- Left -->' +
    '    <div class="left-column">' +
    '      <div class="list-item" ng-repeat="root in currentRoots">' +
    '        <a ng-click="selectRoot(root)">' +
    '          {{root.name}}' +
    '          <span class="child-pointer" ng-if="hasChildren(root)"> &#9658;</span>' +
    '        </a>' +
    '      </div>' +
    '    </div>' +
    '    <!-- Right -->' +
    '    <div class="right-column">' +
    '      <div class="list-item" ng-repeat="child in childrenOfSelectedRoot">' +
    '        <a ng-click="selectChild(child, childrenOfSelectedRoot)">' +
    '          {{child.name}}' +
    '          <span class="child-pointer" ng-if="hasChildren(child)"> &#9658;</span>' +
    '        </a>' +
    '      </div>' +
    '    </div>' +
    '  </div>' +
    '</div>';
}());
