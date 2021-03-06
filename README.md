Angular Directive: Twin Miller Columns Tree Navigation 
======================================================
This is an Angular JS directive that provides a tree navigation in the form of 
twin miller columns which shows the current selected tree node with its siblings
in the left column and the children of the selected tree node in the right
column. When a child, that itself got children, is selected it is (together
with its siblings moved to the left column). in this way there is never more 
than two columns (unlike canonical miller columns where the number of columns
equals the current depth in the tree).

In addition there is a bread crumb to the currently selected tree node displayed
on top of the columns and one can navigate backwards in the hierarchy by selecting
any element in the bread crumb.

See example on [Plunkr](http://embed.plnkr.co/LgjOHVUnwaZEzafcU1ME/preview) for 
further illustration.

Getting Started
---------------
### Installation

Download the [production version][min] or the [development version][max] and [style][css].

[min]: https://raw.github.com/joelbinn/twin-col-tree-nav-directive/master/dist/twin-col-tree-nav-directive.min.js
[max]: https://raw.github.com/joelbinn/twin-col-tree-nav-directive/master/dist/twin-col-tree-nav-directive.js
[css]: https://raw.github.com/joelbinn/twin-col-tree-nav-directive/master/dist/twin-col-tree-nav-directive.css

Or use bower

    bower install --save twin-col-tree-nav-directive

Include in web page

    <link rel="stylesheet" href="twin-col-tree-nav-directive.css" />
    <script src="twin-col-tree-nav-directive.js"></script>

### Add module dependency

    angular.module('myModule', ['twinColTreeNav']);

### Include the directive in a web page...

    <div class="row">
      <div class="col-sm-4 panel panel-default">
        <!--
            Here it is used as an attribute, but it can be used as an element as well.
            The "tree-handle" attribute specifies the tree handle object which shall
            be included in the scope.
         -->
        <div twin-col-tree-nav tree-handle="myTreeHandle"></div>
      </div>
      <div class="col-sm-6 panel panel-default">
          {{selected}}
      </div>
    </div>

### ...and implement tree handle in a controller

     angular.module('myModule', ['twinColTreeNav'])
       .controller('MainCtrl', function ($scope) {
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
               return myTree[parent.name] && myTree[parent.name].map(function(e){
                 return {name: e};
               }) || undefined;
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

Used by the directive to get the children of the specified tree node. If _parentTreeNode_
is _undefined_, it shall be interpreted as "give me all root nodes".

`hasChildren(treeNode)`

Query if the specified tree node has children.

`atTreeNodeSelected(treeNode)`

This is a callback method which is called when a tree node has been selected.

In addition, once the directive has been initialized for a specific tree handle
the handle object will have been adorned with the following method:

`atTreeUpdate()`

This method can be used to signal that the tree data has been updated and that 
the directive needs to update the view. This can typically be used when the tree
is loaded asynchronously.
    
A _treeNode_ is an object which must provide a _name_ property.

The interface to the tree data is designed in this way so that the handle can be 
used to access tree data that exists on the server as well as in a local data 
structure. In addition, the directive makes no assumptions of the actual 
underlying data structure.


## Examples
Example on [Plunkr](http://embed.plnkr.co/LgjOHVUnwaZEzafcU1ME/preview)

## TODO

###Partial tree update
Currently the entire view is reset when calling `atTreeUpdate()`.

`atTreeUpdate()` should take a parameter indicating which parent has been updated
and the directive controller should then perform partial view refresh.


