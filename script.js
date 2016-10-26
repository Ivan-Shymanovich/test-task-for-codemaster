'use strict';

var TreeBuilder = function() {};

/**
 * Fetching data by url and adding tree into element with elemId
 * @param jsonUrl - path to the .json file
 * @param elemId - element for adding tree
 */
TreeBuilder.prototype.render = function(jsonUrl, elemId) {
    var self = this;

    $.getJSON(jsonUrl)
        .done(function(data) {
            console.log(data);
            console.log($(elemId));
            $(elemId).append(self._buildTree(data));
        });
};

/**
 * Builds a tree using data
 * @param data - array of objects than represent a tree structure
 */
TreeBuilder.prototype._buildTree = function (data) {
    var ul = $('<ul></ul>');

    for (var i = 0, length = data.length; i < length; i++) {
        var li = $('<li></li>');
        li.html(data[i].name);

        if (data[i].folders && data[i].folders.length) {
            li.append(this._buildTree( data[i].folders, li));
        }

        ul.append(li);
    }

    return ul;
};

var tree = new TreeBuilder();
tree.render('folders.json', '#container');