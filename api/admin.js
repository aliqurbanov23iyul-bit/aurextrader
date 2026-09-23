const {db}=require("../lib/db"),{auth}=require("../lib/auth");
module.exports=async(req,res)=>{try{
  const p=auth(req,["admin"]),s=db(),action=String(req.query.action||"");
  if(action==="stats"&&req.method==="GET"){
    const u=(await s`SELECT COUNT(*) n,COALESCE(SUM(balance),0) b FROM users WHERE role='user'`)[0];
    const w=(await s`SELECT COUNT(*) n FROM withdrawals WHERE status='pending'`)[0];
    return res.json({users:Number(u.n),pending:Number(w.n),totalBalance:Number(u.b)});
  }
  if(action==="audit"&&req.method==="GET"){
    return res.json(await s`SELECT a.action,a.detail,a.created_at,u.account_id FROM audit a LEFT JOIN users u ON u.id=a.target_user_id ORDER BY a.created_at DESC LIMIT 100`);
  }
  if(action==="settings"&&req.method==="POST"){
    for(const [k,v] of Object.entries(req.body||{}))
      await s`INSERT INTO settings(key,value) VALUES(${k},${String(v)}) ON CONFLICT(key) DO UPDATE SET value=EXCLUDED.value,updated_at=now()`;
    await s`INSERT INTO audit(actor_user_id,action,detail) VALUES(${p.uid},'SETTINGS_UPDATE','Site settings updated')`;
    return res.json({ok:true});
  }
  return res.status(404).json({error:"Unknown admin action"});
}catch(e){res.status(e.status||500).json({error:e.message})}};