import jsonfile from 'jsonfile';
const ReadFile = async (type) => {
    const result = await jsonfile.readFile(process.cwd() + `/data/${type}.json`)
    return result;
}
/**
 *@param {string} type 文件的类型
 *@param {object} result 向文件中写入的数据
 *   */
const WriteFile = async ({
    type,
    result
}) => {
    await jsonfile.writeFile(process.cwd() + `/data/${type}.json`, result);   //写入当前目录对应类型的json
}
export {
    ReadFile,
    WriteFile
}