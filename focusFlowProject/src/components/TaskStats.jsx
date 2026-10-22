
function TaskStats({ tasks }) {
  const allTaskCount = tasks.length

  const completedTaskCount = tasks.filter(
    (task) => task.status === 'completed'
  ).length

  const completionRate =
    tasks.length === 0
      ? 0
      : Math.round((completedTaskCount / tasks.length) * 100)

  return (
    <div className="progress-part">
      <div className="progress-all">
        <p>전체 할 일</p>
        <h1>{allTaskCount}</h1>
      </div>

      <div className="progress-completed">
        <p>완료</p>
        <h1>{completedTaskCount}</h1>
      </div>

      <div className="progress-progress">
        <p>진행률</p>
        <h1>{completionRate}%</h1>
      </div>
    </div>
  )
}

export default TaskStats
