﻿    using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ECommerceServer.Infrastructure.Operations;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;

namespace ECommerceServer.Infrastructure.Services
{
    public class FileService
    {
        async Task<string> FileRenameAsync(string path, string fileName, bool first = true)
        {
            string extension = Path.GetExtension(fileName);
            string newFileName = string.Empty;

            if (first)
            {
                string oldName = Path.GetFileNameWithoutExtension(fileName);
                newFileName = $"{NameOperations.CharacterRegulatory(oldName)}{extension}";
            }
            else
            {
                newFileName = fileName;
                int indexNo1 = newFileName.IndexOf('-');

                if (indexNo1 == -1)
                {
                    newFileName = $"{Path.GetFileNameWithoutExtension(fileName)}-2{extension}";
                }
                else
                {
                    int lastIndex = 0;
                    while (true)
                    {
                        lastIndex = indexNo1;
                        indexNo1 = newFileName.IndexOf("-", indexNo1 + 1);
                        if (indexNo1 == -1)
                        {
                            indexNo1 = lastIndex;
                            break;
                        }
                    }

                    int indexNo2 = newFileName.IndexOf(".");
                    if (indexNo2 == -1)
                    {
                        newFileName = $"{Path.GetFileNameWithoutExtension(fileName)}-2{extension}";
                    }
                    else
                    {
                        string fileNo = newFileName.Substring(indexNo1 + 1, indexNo2 - indexNo1 - 1);
                        if (int.TryParse(fileNo, out int _fileNo))
                        {
                            _fileNo++;
                            newFileName = newFileName.Remove(indexNo1 + 1, indexNo2 - indexNo1 - 1).Insert(indexNo1 + 1, _fileNo.ToString());
                        }
                        else
                        {
                            newFileName = $"{Path.GetFileNameWithoutExtension(fileName)}-2{extension}";
                        }
                    }
                }
            }

            if (File.Exists($"{path}\\{newFileName}"))
            {
                return await FileRenameAsync(path, newFileName, false);
            }

            return newFileName;
        } 
    }
}
