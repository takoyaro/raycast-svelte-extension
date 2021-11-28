import { Form, ActionPanel, SubmitFormAction, showToast, ToastStyle, showHUD, popToRoot, closeMainWindow } from "@raycast/api";
import {exec,spawnSync} from 'child_process';

export default function Command() {
  function handleSubmit(values:any) {
    console.log(values);
    showToast(ToastStyle.Success, "Submitted form", "See logs for submitted values");
    exec('git --version',async (e,SHELL,stderr)=>{
      if(stderr){
        console.error(stderr);
        showHUD('Do you have Git installed?')
      }
      else{
        const ARGS = ["clone", "https://github.com/takoyaro/sveltekit-ts-skeleton.git",`${values.defaultPath}/${values.projectTitle}`]
        const GIT = spawnSync('git',ARGS,{shell:true});
        console.log(ARGS);
        if(GIT.error){
          console.log(GIT.error);
        }
        else{
          exec(`code ${values.defaultPath}/${values.projectTitle}`);
          await popToRoot({ clearSearchBar: true });
          await closeMainWindow({ clearRootSearch: true });
        }
      }
    })
  }

  return (
    <Form
      actions={
        <ActionPanel>
          <SubmitFormAction onSubmit={handleSubmit} />
        </ActionPanel>
      }
    >
      <Form.TextField id="projectTitle" title="Project Title" placeholder="HelloSvelteKit" defaultValue="HelloSvelteKit"/>
      <Form.Separator />
      {/* <Detail markdown="You don't seem to have a default path for your SvelteKit projects." />;
      <Detail markdown="Enter your default **absolute** path to be used with this extension." />; */}
      
      <Form.TextField id="defaultPath" title="Default Projects Path" placeholder="~/Projects" defaultValue="~/Projects"/>
    </Form>
  );
}
