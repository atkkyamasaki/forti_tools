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
        console.log(files);
  
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
    for (var i = 0; i < files.length; i++) {
        var fd = new FormData();
        fd.append('file', files[i]);
  
        sendFileToServer(fd);
  
   }
}

function sendFileToServer(formData) {

    var uploadURL ="/logIntegrate/upload"; //Upload URL
    var extraData ={}; //Extra Data.
    var jqXHR=$.ajax({
        xhr: function() {
            var xhrobj = $.ajaxSettings.xhr();
            if (xhrobj.upload) {
                xhrobj.upload.addEventListener('progress', function(event) {
                    var percent = 0;
                    var position = event.loaded || event.position;
                    var total = event.total;
                    if (event.lengthComputable) {
                        percent = Math.ceil(position / total * 100);
                    }
                }, false);
            }
            return xhrobj;
        },
    url: uploadURL,
    type: "POST",
    contentType:false,
    processData: false,
        cache: false,
        data: formData,
        success: function(data){
            console.log(data);
            selectFileType();
        }
    });
  
}

function selectFileType() {
    var motalElement = $('.container_select_file_type,#container_modal_overlay');

    motalElement.css('display', 'block');

    $('#select_file_type_cancel').on('click', function(){
        motalElement.css('display', 'none');
        // input（file）フィールドの初期化
        $('#input_file').val('');
    });

}
