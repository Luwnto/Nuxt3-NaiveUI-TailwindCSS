const useAdd = ({ num1, num2 }) => {
  const addNum = ref(0)
  watch([num1, num2], ([num1, num2]) => {
    addFn(num1, num2)
  })
  const addFn = (num1, num2) => {
    addNum.value = num1 + num2
  }
  return {
    addNum,
    addFn
  }
}
export default useAdd
