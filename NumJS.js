function get_Dimensions(data) {
  function get_Dim(data, dim, i = 0) {
    if (typeof(data) == "object") {
      dim[i] = data.length;
      get_Dim(data[0], dim, ++i);
    } else if (typeof(data) == "number") {
      return 1;
    } else {
      return undefined;
    }
  }
  var dimen = [];
  get_Dim(data, dimen);
  return dimen;
}

function check_all_dimensions_same(firstArray, secondArray) {
  var firstSize = get_Dimensions(firstArray);
  var secondSize = get_Dimensions(secondArray);
  if (firstSize.length != secondSize.length) {
    return false;
  } else {
    for (var i = 0; i < firstArray.length; i++) {
      if (firstSize[i] != secondSize[i]) {
        return false;
      }
    }
    return true;
  }
}

function add_two_array(data_array, to_add) {
  function inner_add(data_array, to_add, to_store) {
    for (i in data_array) {
      if (typeof(data_array[i]) == 'number') {
        to_store[i] = data_array[i] + to_add[i];
      } else if (typeof(data_array[i] == 'object')) {
        inner_add(data_array[i], to_add[i], to_store[i]);
      }
    }
  }
  inner_add(data_array, to_add, data_array);
  return data_array;
}

function add_number_and_array(data_array, to_add) {
  // console.log("in add number and array");
  // console.log(data_array);
  // console.log(to_add);

  function inner_add_number_and_array(data_array, to_add, to_store) {
    for (i in data_array) {
      if (typeof(data_array[i]) == 'object') {
        var newdata = [];
        to_store[i] = inner_add_number_and_array(data_array[i], to_add, newdata);
      } else {
        to_store[i] = data_array[i] + to_add;
      }
    }
    return to_store;
  }
  // var newdata = data_array.slice();
  inner_add_number_and_array(data_array, to_add, data_array);
  return data_array;
}

function add_nonEqual_array(data_array, to_add) {
  function temp_add_nonEqual_array(data_array, to_add, to_store) {
    var data_dimension = get_Dimensions(data_array);
    var to_add_dimension = get_Dimensions(to_add);
    var subset_data_dimension = data_dimension.slice(data_array.length - to_add.length);

    function isInnerDimensionSame() {
      for (var i in to_add_dimension) {
        if (to_add[i] != subset_data_dimension[i]) {
          return false;
        }
      }
      return true;
    }

    if (isInnerDimensionSame()) {
      res = new_add(data_array, to_add);
    } else {
      if (data_dimension[data_dimension.length - 2] == to_add_dimension[0]) {
        add_to_column(data_array, to_add);
      } else if (data_dimension[data_dimension.length - 1] == to_add_dimension[1]) {
        add_to_row(data_array, to_add);
      } else {
        throw new Error("Cannot compute the request Sorry");
      }
    }
  }
  // var newdata = data_array.slice();
  temp_add_nonEqual_array(data_array, to_add, data_array);
  return data_array;
}

function add_to_column(data_array, to_add) {
  function temp_add(data_array, to_add, to_store, i = 0) {
    if (typeof(data_array[0]) == 'number') {
      for (k in data_array) {
        to_store[k] = data_array[k] + to_add[i][0];
      }
    } else if (typeof(data_array[i] == 'object')) {
      for (y in data_array) {
        temp_add(data_array[y], to_add, to_store[y], y);
      }
    }
  }
  // var newdata = data_array.slice();
  temp_add(data_array, to_add, data_array);
  return data_array;
}

function add_to_row(data_array, to_add) {
  function temp_add(data_array, to_add, to_store, i = 0) {
    if (get_Dimensions(data_array).length == 1) {
      for (j in data_array) {
        to_store[j] = data_array[j] + to_add[0];
      }
    } else {
      for (k in data_array) {
        temp_add(data_array[k], to_add, to_store[k], k);
      }
    }
  }
  // var newdata = data_array.slice();
  temp_add(data_array, to_add, data_array);
  return data_array;

}

function new_add(data_array, to_add) {
  function temp_add(data_array, to_add, to_store, i = 0) {
    if (i < data_array.length) {
      if (check_all_dimensions_same(data_array, to_add)) {
        to_store[i] = add_two_array(data_array, to_add);
      } else {
        for (j in data_array) {
          temp_add(data_array[j], to_add, j);
        }
      }
    }
  }
  // var newdata = data_array.slice();
  temp_add(data_array, to_add, data_array);
  return data_array;
}

function inner_add(data_array, to_add) {
  function temp_inner_add(data_array, to_add, to_store) {
    console.log("in temp inner add");
    console.log(typeof [to_add]);

    if (typeof(to_add) == 'number') {
      // console.log("in inner add if");
      return add_number_and_array(data_array, to_add, to_store);
    } else if (typeof(to_add) == 'object') {
      if (check_all_dimensions_same(data_array, to_add)) {
        add_two_array(data_array, to_add, to_store);
        return to_store;
      } else {
        add_nonEqual_array(data_array, to_add, to_store);
      }
    }
  }
  // var newdata = data_array.slice();
  temp_inner_add(data_array, to_add, data_array);
  return data_array;
}

function add(data_array, to_add) {
  return inner_add(data_array, to_add);
}

// var a = [1, 2, 3, 4, 5];
// var re = add(a, [1, 2, 3, 4, 5], true);
var b = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
  [5, 2, 1]
];

var e = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
  [5, 2, 1]
];

var c = [
  [1],
  [2],
  [3],
  [4]
];

var d = [
  // (3,4,5)
  [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0]
  ],
  [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0]
  ],
  [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0]
  ]
]


// console.log(add_two_array(b,e));
// console.log(b);
console.log("-----------------------");
a = [1];
console.log();
// console.log(a);

// var res = b.slice();
// console.log(b);
// console.log(add_two_array(b, e, res));
// console.log(res);
/*
var d = [
  // (3,4,5)
  [
    [0, 0, 0, 0,0],
    [0, 0, 0, 0,0],
    [0, 0, 0, 0,0],
    [0, 0, 0, 0,0]
  ],
  [
    [0, 0, 0, 0,0],
    [0, 0, 0, 0,0],
    [0, 0, 0, 0,0],
    [0, 0, 0, 0,0]
  ],
  [
    [0, 0, 0, 0,0],
    [0, 0, 0, 0,0],
    [0, 0, 0, 0,0],
    [0, 0, 0, 0,0]
  ]
]
*/

// var res = add([1], 2);
// var res = get_Dimensions(c);
// console.log(res);
// var e = [
//   [1],
//   [2],
//   [3]
// ];

// console.log(b);
// console.log(a);