
import {EditableSpan} from "./EditableSpan";
import {Button} from "./Button";

type Props = {

};
export const Task = (props: Props) => {
    return (
        <li key={task.id} className={task.isDone ? 'is-done' : ''}>
            <input type="checkbox" checked={task.isDone} onChange={changeTaskStatusHandler}/>
            {/*<span>{task.title}</span>*/}
            <EditableSpan oldTitle={task.title} updateItem={updateTaskHandler}/>
            <Button onClick={removeTaskHandler} title={'x'}/>
        </li>
    );
};