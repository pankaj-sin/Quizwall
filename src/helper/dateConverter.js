export const dateConvert = (date) => {

    let day = date?.split("T")[0]
    let time = date?.split("T")?.[1]?.split(".")[0]

    return `${day} ${time}`
}