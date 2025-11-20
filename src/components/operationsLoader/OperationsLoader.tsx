import css from './OperationsLoader.module.css'


const OperationsLoader = () => {
  return (
    <div className={css.backdrop}>
      <div className={css.loading}>Wait, please</div>
    </div>
  )
}

export default OperationsLoader
