//for creating folder
const fs = require("fs");
const path = require("path"); //gives image path(myImg.jpeg)

//folder path to store the datas
const mainDirectoryPath = `/home/diggiserveradmin/OnBoarding-Documnets`;

const createFolder = ( id) => {
    const folderPath = mainDirectoryPath + "/" + id;
    fs.access(folderPath, (error) => {
      // To check if the given directory
      // already exists or not
      if (error) {
        // If current directory does not exist
        // then create it
        fs.mkdir(folderPath, (error) => {
          if (error) {
            console.log(error);
          } else {
            console.log("New Directory created successfully !!");
          }
        });
      } else {
        console.log("Given Directory already exists !!");
      }
    });
  };
  //uploading the file
  const uploadfile=async (files,id)=>{
      const mainPath=mainDirectoryPath+"/"+id
      for (const item in files) {
        const dat=files[item]
        console.log(dat)
          const savePath=path.join(mainPath,dat.name)
          await dat.mv(savePath)
      } 
        
  }
  module.exports={createFolder,uploadfile}