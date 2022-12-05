var bookList = []
var currentIndex = -1

$(function() {
	//Bat dau xu ly -> khi khoi code dc tai xong & ve xong UI
	init()
})

function init() {
	var json = localStorage.getItem('bookList')
	if(json != '' && json != null) {
		bookList = JSON.parse(json)

		showData()
	}
}

function saveData() {
	var std = {
		"maSach": $('#masach').val(),
		"tenSach": $('#tensach').val(),
		"theLoai": $('#theloai').val(),
		"ngayNhap": $('#ngaynhap').val(),
		"soLuong": $('#soluong').val(),
		"giaBan": $('#giaban').val()
	}

	if(currentIndex >= 0) {
		bookList[currentIndex] = std
		currentIndex = -1
	} else {
		bookList.push(std)
	}

	saveLocalStorage()
	showData()

	return false;
}

function selectedItem(index) {
	currentIndex = index

	//set du lieu vao form input
	$('#masach').val(bookList[index].maSach)
	$('#tensach').val(bookList[index].tenSach)
	$('#theloai').val(bookList[index].theLoai)
	$('#ngaynhap').val(bookList[index].ngayNhap)
	$('#soluong').val(bookList[index].soLuong)
	$('#giaban').val(bookList[index].giaBan)
}

function removeItem(index) {
	option = confirm('Bạn muốn xóa dòng này?')
	if(!option) return

	bookList.splice(index, 1)

	saveLocalStorage()
	showData()
}

function showData() {
	$('#result').empty()

	for (var i = 0; i < bookList.length; i++) {
		$('#result').append(`<tr>
			<td>${i+1}</td>
			<td>${bookList[i].maSach}</td>
			<td>${bookList[i].tenSach}</td>
			<td>${bookList[i].theLoai}</td>
			<td>${bookList[i].ngayNhap}</td>
			<td>${bookList[i].soLuong}</td>
			<td>${bookList[i].giaBan}</td>
			<td><button class="btn-warning" onclick="selectedItem(${i})">Edit</button></td>
			<td><button class="btn-danger" onclick="removeItem(${i})">Remove</button></td>
		</tr>`)
	}
}

function saveLocalStorage() {
	var json = JSON.stringify(bookList)

	localStorage.setItem('bookList', json)
}