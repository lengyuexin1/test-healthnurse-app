/**
 * @param 安卓获取 手机本地相册静态资源
 */


// 处理获取到的路径日期(添加时间戳)
const formatDate = (value: any) => {
    if (!value) return '';
	// 创建Date对象
	let date = new Date(value);
	let year = date.getFullYear();
	let month = (date.getMonth() + 1).toString().padStart(2, '0');
	let day = date.getDate().toString().padStart(2, '0');
	return `${year}年${month}月${day}日`;
}

// 根据页码和每页大小切割
function paginateArray(array: any, pageNumber: any, pageSize: any) {
    // 计算总页数
    const totalPages = Math.ceil(array.length / pageSize);
    
    // 如果请求的页码大于总页数，返回空数组
    if (pageNumber < 1 || pageNumber > totalPages) {
        return [];
    }

    const startIndex = (pageNumber - 1) * pageSize;

    const paginatedItems = array.slice(startIndex, startIndex + pageSize);

    return paginatedItems
}


let saveImgList = [] as any
let saveVideoList = [] as any
// 获取相片

export const getimageFile = async (params: any) => {

    // 页面数
    let pageNumber = params.pageNumber ? params.pageNumber : 1
    // 一页数量
    let pageSize = params.pageSize ? params.pageSize : 20
    // 排序方式 date_added_DESC 降序  date_added_ASCE 升序
    let sortOrder = params.sortOrder ? params.sortOrder : 'date_added_DESC'


    let start = pageNumber * pageSize;
    let end = start + pageSize;

    uni.showLoading({
        title: '加载中...'
    });

    
    let offset = (pageNumber - 1) * pageSize;

    console.log('pageNumber,pageSize,offset',pageNumber,pageSize,offset);



    var platform = uni.getSystemInfoSync().platform;



    let img = [] as any
    let media = [] as any

    if(platform == "android"){
		

        // console.log('file:///storage/emulated/0/Pictures');
        // console.log('file:///storage/emulated/0/DCIM');
        
        await new Promise<void>((resolve, reject) => {
            plus.io.resolveLocalFileSystemURL('file:///storage/emulated/0/DCIM', (entry) => {
                let directoryReader = entry.createReader();
                directoryReader.readEntries((entries: any) => {
                    console.log('entries',entries);
                    console.log('entries.length',entries.length);
                    
                    // 遍历文件条目
                    for (let i = start; i < end && i < entries.length; i++) {
                    // for (let i=0;i<entries.length;i++) {
                        if (entries[i].isFile) {
                            // 读取图片
                            if (/\.(jpg|jpeg|png|GIF|JPG|PNG|gif|webp|WEBP)$/.test(entries[i].name)) {
                                img.push({
                                    id: i,
                                    img: entries[i].fullPath,
                                    file: entries[i].fullPath,
                                    ischeck: false,
                                    isImg: true,
                                    isVideo: false,
                                    // entries: entries[i],
                                });
                            // 读取视频
                            } else if (/\.(mp4|MP4)$/.test(entries[i].name)) {
                                media.push({
                                    id: i,
                                    img: entries[i].fullPath,
                                    file: entries[i].fullPath,
                                    src: "file://" + entries[i].fullPath,
                                    ischeck: false,
                                    isImg: true,
                                    isVideo: false,
                                    // entries: entries[i],

                                });
                            }
                        }
                    }

                    // 数据加载完成，隐藏loading
                    uni.hideLoading();

                    console.log('img1',img);
                    console.log('img2222',img.length);

                    
                    console.log('media1',media);
                    console.log('media1222',media.length);

                    // 返回结果
                    resolve();
                }, (err) => {
                    console.error('读取目录失败:', err);
                    uni.hideLoading();
                    reject(err);
                });
            }, (e) => {
                console.error('打开文件系统失败:', e);
                uni.hideLoading();
                reject(e);
            });
        });
    }


    if(platform == "ios"){

    }



    console.log('outimg1',img);
    console.log('outimg2222',img.length);

    if (!img.length) {
        img = nextgetimageFile(params)
        console.log('newArr111',img);
    }

    

    return img




    let imageList = []
    let MediaStore = plus.android.importClass('android.provider.MediaStore') as any;
    let ContentResolver = plus.android.importClass('android.provider.ContentResolver') as any;
    let photoColumns = [
        MediaStore.Images.Media._ID,
        MediaStore.Images.Media.DATA,
        MediaStore.Images.Media.DATE_ADDED
    ]
    
   
    // let queryArgs = Bundle()

    let querySortOrder = " limit " + pageSize + " offset " + offset
    // let querySortOrder = MediaStore.Images.Media.DATE_ADDED + " ASC"
    //  + " DESC limit " + pageSize + " offset " + offset

    let main = plus.android.runtimeMainActivity() as any;
    let resolver = main.getContentResolver();
    plus.android.importClass(resolver);
    console.log('querySortOrder',querySortOrder);

    // let cursor = resolver.query(
    //     MediaStore.Images.Media.EXTERNAL_CONTENT_URI, 
    //     photoColumns,
    //     null, 
    //     null,
    //     `LIMIT ${pageSize} OFFSET ${offset}`,
    //     )
    let cursor = resolver.query(
        MediaStore.Images.Media.EXTERNAL_CONTENT_URI, 
        photoColumns,
        // querySortOrder,
        // ${292498} LIMIT ${0},${10}
        // MediaStore.Images.Media._ID + ` LIKE '%'`,
        MediaStore.Images.Media._ID +  ` LIKE '%'`,
        null,
        null,

        // 'DESC limit 5',
    )
    console.log('相册参数cursor1111',MediaStore.Images.Media._ID + ` LIKE '%' LIMIT 5`);

    console.log('相册参数cursor2222',cursor);

    // MediaStore.Images.Media.DATE_MODIFIED + " limit " + ((pageNumber) * pageSize) + "," + pageSize
    // `limit ${pageSize} OFFSET ${offset}`
    plus.android.importClass(cursor);
    
    let index = 0
    while (cursor.moveToNext()) {
        let _id = cursor.getString(cursor.getColumnIndexOrThrow(MediaStore.Images.Media._ID))
        // 路径path
        let filePath = cursor.getString(cursor.getColumnIndexOrThrow(MediaStore.Images.Media.DATA))
        // 时间戳
        let dateAdded = cursor.getLong(cursor.getColumnIndexOrThrow(MediaStore.Images.Media.DATE_ADDED))
        let imgDate = formatDate(dateAdded * 1000)
        
        imageList.push({
            index,
            id: _id,
            dateAdded: dateAdded,
            date: imgDate,
            img: filePath,
            file: filePath,
            ischeck: false,
            isImg: true,
            isVideo: false,
        })
        index ++ 
    }
    cursor.close()
    uni.hideLoading();

    

    // 默认按时间从最近升序 
    if (sortOrder == 'date_added_ASCE') {
        imageList.sort((a: any, b: any) => a.dateAdded - b.dateAdded);
    }else{
        imageList.sort((a: any, b: any) => b.dateAdded - a.dateAdded);
    }

    let pagefileList = imageList
    

    console.log('相册all',imageList)
    console.log('相册page',pagefileList);
    
    uni.hideLoading();
    return pagefileList
}
 

export const nextgetimageFile = (params: any) => {

    // 页面数
    let pageNumber = params.pageNumber ? params.pageNumber : 1
    // 一页数量
    let pageSize = params.pageSize ? params.pageSize : 20
    // 排序方式 date_added_DESC 降序  date_added_ASCE 升序
    let sortOrder = params.sortOrder ? params.sortOrder : 'date_added_DESC'
    console.log('pageNumber,pageSize',pageNumber,pageSize);

    uni.showLoading({
        title: '加载中...'
    });

    // 初始化获取
    if (saveImgList.length == 0) {
        console.log('第一次获取相片');
        
        let imageList = []
        let MediaStore = plus.android.importClass('android.provider.MediaStore') as any;
        let photoColumns = [
            MediaStore.Images.Media._ID,
            MediaStore.Images.Media.DATA,
            MediaStore.Images.Media.DATE_ADDED
        ]
        let main = plus.android.runtimeMainActivity() as any;
        let resolver = main.getContentResolver();
        plus.android.importClass(resolver);
        let cursor = resolver.query(MediaStore.Images.Media.EXTERNAL_CONTENT_URI, photoColumns, null, null, null)
        plus.android.importClass(cursor);

        console.log('相册参数main',main);
        console.log('相册参数resolver',resolver);
        console.log('相册参数cursor',cursor);
        

        let index = 0
        while (cursor.moveToNext()) {
            let _id = cursor.getString(cursor.getColumnIndexOrThrow(MediaStore.Images.Media._ID))
            // 路径path
            let filePath = cursor.getString(cursor.getColumnIndexOrThrow(MediaStore.Images.Media.DATA))
            // 时间戳
            let dateAdded = cursor.getLong(cursor.getColumnIndexOrThrow(MediaStore.Images.Media.DATE_ADDED))
            let imgDate = formatDate(dateAdded * 1000)
            
            imageList.push({
                index,
                id: _id,
                dateAdded: dateAdded,
                date: imgDate,
                img: filePath,
                file: filePath,
                ischeck: false,
                isImg: true,
                isVideo: false,
            })
            index ++ 
        }
        cursor.close()
        uni.hideLoading();

        saveImgList = imageList
    }

    

    // 默认按时间从最近升序 
    if (sortOrder == 'date_added_ASCE') {
        saveImgList.sort((a: any, b: any) => a.dateAdded - b.dateAdded);
    }else{
        saveImgList.sort((a: any, b: any) => b.dateAdded - a.dateAdded);
    }

    let pagefileList = paginateArray(saveImgList, pageNumber, pageSize)
    

    console.log('相册all',saveImgList)
    console.log('相册page',pagefileList);
    
    uni.hideLoading();
    return pagefileList
}



// export const getimageFile = (params: any) => {

//     // 页面数
//     let pageNumber = params.pageNumber ? params.pageNumber : 1
//     // 一页数量
//     let pageSize = params.pageSize ? params.pageSize : 20
//     // 排序方式 date_added_DESC 降序  date_added_ASCE 升序
//     let sortOrder = params.sortOrder ? params.sortOrder : 'date_added_DESC'
//     console.log('pageNumber,pageSize',pageNumber,pageSize);

//     uni.showLoading({
//         title: '加载中...'
//     });

//     // 初始化获取
//     if (saveImgList.length == 0) {
//         console.log('第一次获取相片');
        
//         let imageList = []
//         let MediaStore = plus.android.importClass('android.provider.MediaStore') as any;
//         let photoColumns = [
//             MediaStore.Images.Media._ID,
//             MediaStore.Images.Media.DATA,
//             MediaStore.Images.Media.DATE_ADDED
//         ]
//         let main = plus.android.runtimeMainActivity() as any;
//         let resolver = main.getContentResolver();
//         plus.android.importClass(resolver);
//         let cursor = resolver.query(MediaStore.Images.Media.EXTERNAL_CONTENT_URI, photoColumns, null, null, null)
//         plus.android.importClass(cursor);

//         console.log('相册参数main',main);
//         console.log('相册参数resolver',resolver);
//         console.log('相册参数cursor',cursor);
        

//         let index = 0
//         while (cursor.moveToNext()) {
//             let _id = cursor.getString(cursor.getColumnIndexOrThrow(MediaStore.Images.Media._ID))
//             // 路径path
//             let filePath = cursor.getString(cursor.getColumnIndexOrThrow(MediaStore.Images.Media.DATA))
//             // 时间戳
//             let dateAdded = cursor.getLong(cursor.getColumnIndexOrThrow(MediaStore.Images.Media.DATE_ADDED))
//             let imgDate = formatDate(dateAdded * 1000)
            
//             imageList.push({
//                 index,
//                 id: _id,
//                 dateAdded: dateAdded,
//                 date: imgDate,
//                 img: filePath,
//                 file: filePath,
//                 ischeck: false,
//                 isImg: true,
//                 isVideo: false,
//             })
//             index ++ 
//         }
//         cursor.close()
//         uni.hideLoading();

//         saveImgList = imageList
//     }

    

//     // 默认按时间从最近升序 
//     if (sortOrder == 'date_added_ASCE') {
//         saveImgList.sort((a: any, b: any) => a.dateAdded - b.dateAdded);
//     }else{
//         saveImgList.sort((a: any, b: any) => b.dateAdded - a.dateAdded);
//     }

//     let pagefileList = paginateArray(saveImgList, pageNumber, pageSize)
    

//     console.log('相册all',saveImgList)
//     console.log('相册page',pagefileList);
    
//     uni.hideLoading();
//     return pagefileList
// }



//  获取视频
export const getvideoFile = (params: any) => {


    // 页面数
    let pageNumber = params.pageNumber ? params.pageNumber : 1
    // 一页数量
    let pageSize = params.pageSize ? params.pageSize : 20
    // 排序方式 date_added_DESC 降序  date_added_ASCE 升序
    let sortOrder = params.sortOrder ? params.sortOrder : 'date_added_DESC'
    console.log('pageNumber,pageSize',pageNumber,pageSize);

    uni.showLoading({
        title: '加载中...'
    });

    if (saveVideoList.length == 0) {
        console.log('第一次获取视频');
        let VideoList = []
        let MediaStore = plus.android.importClass('android.provider.MediaStore') as any;
        let videoColumns = [
            MediaStore.Video.Media._ID,
            MediaStore.Video.Media.DATA,
            MediaStore.Video.Media.DATE_ADDED
        ]
        let main = plus.android.runtimeMainActivity() as any;
        let resolver = main.getContentResolver();
        plus.android.importClass(resolver);
        let cursor = resolver.query(MediaStore.Video.Media.EXTERNAL_CONTENT_URI, videoColumns, null, null, null)
        plus.android.importClass(cursor);
        while (cursor.moveToNext()) {
            let _id = cursor.getString(cursor.getColumnIndexOrThrow(MediaStore.Video.Media._ID))
            // 路径path
            let filePath = cursor.getString(cursor.getColumnIndexOrThrow(MediaStore.Video.Media.DATA))
            // 时间戳
            let dateAdded = cursor.getLong(cursor.getColumnIndexOrThrow(MediaStore.Video.Media.DATE_ADDED))
            let VideoDate = formatDate(dateAdded * 1000)
            
            VideoList.push({
                id: _id,
                dateAdded: dateAdded,
                date: VideoDate,
                videoPath: filePath,
                src: "file://" + filePath,
                file: filePath,
                ischeck: false,
                isImg: false,
                isVideo: true,
            })
        }
        cursor.close()

        saveVideoList = VideoList
    }


	// 默认按时间从最近升序 
    if (sortOrder == 'date_added_ASCE') {
        saveVideoList.sort((a: any, b: any) => a.dateAdded - b.dateAdded);
    }else{
        saveVideoList.sort((a: any, b: any) => b.dateAdded - a.dateAdded);
    }

    let pagefileList = paginateArray(saveVideoList, pageNumber, pageSize)
    

    console.log('相册all',saveVideoList)
    console.log('相册page',pagefileList);
    
    uni.hideLoading();


	return saveVideoList

}

// 清空缓存获取内容
export const closeArr = () => {
    console.log('清空前saveImgList',saveImgList);
    console.log('清空前saveVideoList',saveVideoList);
    
    saveImgList = []
    saveVideoList = []

    console.log('清空后saveImgList',saveImgList);
    console.log('清空后saveVideoList',saveVideoList);
}