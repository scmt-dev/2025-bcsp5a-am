function add(a, b) {
    return a + b;
}

let result = add(2, 3);
console.log("Result:", result);

function handleAdd() {
    const a = document.getElementById('a').value;
    const b = document.getElementById('b').value;
    if(a == '' && b == '') {
        alert('Please enter values for both fields.');
        return;
    }
    const sum = add(Number(a),Number(b))
    const result = document.getElementById('result');
    if(sum > 0) {
        result.style.color = 'green';
    }else {
        result.style.color = 'red';
        result.style.backgroundColor = 'black';
    }
    result.textContent = sum
    console.log("Sum:", sum);
}