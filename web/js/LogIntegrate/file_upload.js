
// File のドラッグ&ドロップ
// 参考 URL
// http://www.it-view.net/drag-and-drop-file-upload-jquery-178.html

$(document).ready(function() {
    var obj = $("#file_drag_drop_handler");

    obj.on('dragenter', function (e) {
        e.stopPropagation();
        e.preventDefault();
        $(this).css('border', '2px solid #0275d8');
    });

    obj.on('dragover', function (e) {
         e.stopPropagation();
         e.preventDefault();
    });

    obj.on('drop', function (e) {
        $(this).css('border', '2px dashed #0275d8');
        e.preventDefault();
        var files = e.originalEvent.dataTransfer.files;
  
        //We need to send dropped files to Server
        handleFileUpload(files,obj);
    });

    $('#file_click_handler').on('click', function (e) {
        $('#input_file').trigger('click');
    });
    $('#input_file').on('change', function() {
        var files = this.files;
        handleFileUpload(files,obj);
    });

    $(document).on('dragenter', function (e) {
        e.stopPropagation();
        e.preventDefault();
    });

    $(document).on('dragover', function (e) {
        e.stopPropagation();
        e.preventDefault();
        obj.css('border', '2px dashed #0275d8');
    });

    $(document).on('drop', function (e) {
        e.stopPropagation();
        e.preventDefault();
    });
});

function handleFileUpload(files,obj) {

    $('.all_loading').removeClass('hide');

    for (var i = 0; i < files.length; i++) {
        var fd = new FormData();
        fd.append('file', files[i]);
  
        sendFileToServer(fd);
  
   }
}

function sendFileToServer(formData) {

    var uploadURL = "/logIntegrate/upload"; //Upload URL
    var extraData = {}; //Extra Data.
    var jqXHR = $.ajax({
    url: uploadURL,
    type: "POST",
    contentType:false,
    processData: false,
        cache: false,
        data: formData,
        success: function(data){
            var motalElement = $('.container_select_file_type,#container_modal_overlay');
            motalElement.css('display', 'block');
            $('.all_loading').addClass('hide');
        }
    });
  
}



// ファイルアップロード後の処理

$(function() {
    var motalElement = $('.container_select_file_type,#container_modal_overlay');

    $('#select_file_type_submit').on('click', function(){

        $('.all_loading').removeClass('hide');

        var id = $('#id').text();
        var uploadFirmware = $('[name="upload_firmware"]').val();
        var uploadFile = $('[name="upload_file"]').val();
        var count = $('body > div.container_result > div > p').length + 1;

        motalElement.css('display', 'none');

        $.ajax({
            type: 'post',
            url: '/logIntegrate/uploadLogResult',
            data: {
                'id': id,
                'firmware': uploadFirmware,
                'file': uploadFile,
                'count': count,
            },
            success: function (data) {
                var addToContainer = $('.container_operate_tools')
                addToContainer.append(data.htmlFilterBtn);
            },
            complete: function () {

                $('.container_result').removeClass('hide');
                $('.all_loading').addClass('hide');
            }
        });


        // input（file）フィールドの初期化
        $('#input_file').val('');
    });

    $('#select_file_type_cancel').on('click', function(){
        motalElement.css('display', 'none');
        // input（file）フィールドの初期化
        $('#input_file').val('');
    });
});