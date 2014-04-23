Angular Directive: Twin Miller Column Tree Navigation 
=====================================================
This is an angular directive that provides a tree navigation in the form of 
twin miller columns which shows the current selcted tree node with its siblings 
and its children. In addition the bread crumb to the currently selected tree
node is displayed.

Getting Started
---------------
### Installation

Download the [production version][min] or the [development version][max].

[min]: https://raw.github.com/joelbinn/twin-col-tree-nav-directive/master/dist/twin-col-tree-nav-directive.min.js
[max]: https://raw.github.com/joelbinn/twin-col-tree-nav-directive/master/dist/twin-col-tree-nav-directive.js

Or use bower

    bower install --save twin-col-tree-nav-directive

### Add module dependency

    angular.module('myModule', ['twinColTreeNav']);

### Include the directive in a web page...

    <div class="row">
        <div class="col-md-3">
            <!-- 
            Here it is used as an attribute, but it can be used as an element as well. 
            The "tree-handle" attribute specifies the tree handle object which shall
            be included in the scope.
            -->
            <div twin-col-tree-nav tree-handle="myTreeHandle"></div>
        </div>
        <div class="col-md-9">
            {{selected}}
        </div>
    </div>

### ...and implement tree handle in a controller

    angular.module('myModule').controller('MainCtrl', function ($scope) {
      // Remember, the underlying tree data can be o any structure...
      var myTree = {
        root1: ['node1', 'node2', 'node3'],
        root2: ['node4','node5'],
        node1: ['node10','node11'],
        node3: ['node30','node31','node32'],
        node5: ['node50','node51'],
        node51: ['node510','node511']
      };
        
      $scope.myTreeHandle = {
        atSelectTreeNode: function (treeNode) {
          $scope.selected = treeNode;
        },
        getChildren: function (parent) {
          if (parent === undefined) {
            // this means "get all root nodes"
            return [{name:'root1'},{name:'root2'}];
          } else {
            return myTree[parent.name];
          }
        },
        hasChildren: function (treeNode) {
      	  if (treeNode === undefined) {
      	    return true;
      	  } else {
      	    return myTree[treeNode.name] !== undefined;
          }
        }
      };
    });

## Documentation
The tree directive is given access to the tree data by providing a handle in the form 
of an object with an interface with the following methods:
    
`getChildren(parentTreeNode)`

Used by the directive to get the children of the specified tree node.

`hasChildren(treeNode)`

Query if the specified tree node has children.

`atTreeNodeSelected(treeNode)`

This is a callback method which is called when a tree node has been selected.

In addition, once the directive has been initialized for a specific tree handle
the handle object will have been adorned with the following method:

`atTreeUpdate()`

This method can be used to signal that the tree data has been updated and that 
the directive needs to update the view. 
    
A _treeNode_ is an object which must provide a _name_ property.

The interface to the tree data is designed in this way so that the handle can be 
used to access tree data that exists on the server as well as in a local data 
structure. In addition, the directive makes no assumptions of the actual 
underlying data structure.


## Examples
_(Coming soon)_

