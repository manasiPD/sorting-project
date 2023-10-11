const express = require('express');

const app = express();

app.use(express.static('public'));
app.use(express.json());

app.set('view engine', 'ejs');

// Sample array
const dataArray = [3, 50, 1, 5, 20, 37, 70, 23];

// Function to perform selection Sort
function selectionSort(arr) {
    const n = arr.length;
    for (let i = 0; i <= n - 2; i++) {
        let mini = i;
        for (let j = i; j <= n - 1; j++) {
            if (arr[j] < arr[mini]) {
                mini = j;
            }
        }
        // swaping
        let temp = arr[mini];
        arr[mini] = arr[i];
        arr[i] = temp;
    }
    return arr;
}

// Function to perform insertion Sort
function insertionSort(arr) {
    const n = arr.length;
    for (let i = 0; i <= n - 1; i++) {
        let j = i;
        while (j > 0 && arr[j - 1] > arr[j]) {
            // swaping
            let temp = arr[j - 1];
            arr[j - 1] = arr[j];
            arr[j] = temp;
            j--;
        }
    }
    return arr;
}

// Function to perform bubble Sort
function bubbleSort(arr) {
    const n = arr.length;
    for (let i = n - 1; i >= 0; i--) {
        for (let j = 0; j <= i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                // swaping
                let temp = arr[j + 1];
                arr[j + 1] = arr[j];
                arr[j] = temp;
            }
        }
    }
    return arr;
}

// Function to perform Quick Sort
function quickSort(arr) {
    if (arr.length <= 1) {
        return arr;
    }

    const pivot = arr[0];
    const left = [];
    const right = [];

    for (let i = 1; i < arr.length; i++) {
        if (arr[i] < pivot) {
            left.push(arr[i]);
        } else {
            right.push(arr[i]);
        }
    }

    return [...quickSort(left), pivot, ...quickSort(right)];
}

// Function to perform merge sort
function mergeSort(arr) {
    if (arr.length <= 1) {
        return arr;
    }

    const middle = Math.floor(arr.length / 2);
    const left = arr.slice(0, middle);
    const right = arr.slice(middle);

    return merge(mergeSort(left), mergeSort(right));
}

function merge(left, right) {
    let result = [];
    let leftIndex = 0;
    let rightIndex = 0;

    while (leftIndex < left.length && rightIndex < right.length) {
        if (left[leftIndex] < right[rightIndex]) {
            result.push(left[leftIndex]);
            leftIndex++;
        } else {
            result.push(right[rightIndex]);
            rightIndex++;
        }
    }

    // Concatenate any remaining elements from both arrays
    return result.concat(left.slice(leftIndex), right.slice(rightIndex));
}

// Function to perform Shell Sort
function shellSort(arr) {
    const n = arr.length;
    let gap = Math.floor(n / 2);

    while (gap > 0) {
        for (let i = gap; i < n; i++) {
            const temp = arr[i];
            let j = i;

            while (j >= gap && arr[j - gap] > temp) {
                arr[j] = arr[j - gap];
                j -= gap;
            }

            arr[j] = temp;
        }

        gap = Math.floor(gap / 2);
    }
    return arr;
}




app.post('/randomize-array', (req, res) => {
    // Shuffle the dataArray to randomize it
    for (let i = dataArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [dataArray[i], dataArray[j]] = [dataArray[j], dataArray[i]];
    }

    // Send the randomized array as a JSON response
    res.json({ randomizedArray: dataArray });
});

app.post('/selection-sort', (req, res) => {
    const dataToSort = req.body.dataToSort;
    const sortedData = selectionSort(dataToSort);
    // Send the sorted array using selection sort as a JSON response
    res.json({ sortedData });
})

app.post('/insertion-sort', (req, res) => {
    const dataToSort = req.body.dataToSort;
    const sortedData = insertionSort(dataToSort);

    // Send the sorted array using insertion sort as a JSON response
    res.json({ sortedData });

})

app.post('/bubble-sort', (req, res) => {
    const dataToSort = req.body.dataToSort;
    const sortedData = bubbleSort(dataToSort);

    // Send the sorted array using bubble sort as a JSON response
    res.json({ sortedData });

})

app.post('/quick-sort', (req, res) => {
    const dataToSort = req.body.dataToSort;
    const sortedData = quickSort(dataToSort);

    // Send the sorted array using quick sort as a JSON response
    res.json({ sortedData });

})

app.post('/merge-sort', (req, res) => {
    const dataToSort = req.body.dataToSort;
    const sortedData = mergeSort(dataToSort);

    // Send the sorted array using merge sort as a JSON response
    res.json({ sortedData });

})

app.post('/shell-sort', (req, res) => {
    const dataToSort = req.body.dataToSort;
    const sortedData = shellSort(dataToSort);

    // Send the sorted array using shell sort as a JSON response
    res.json({ sortedData });;

})



app.get('/', (req, res) => {
    res.render('index', { dataArray });
})

app.listen(3000, () => {
    console.log('Listening on port 3000');
})