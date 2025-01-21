<style>
    body{
        display: flex;
        justify-content: center;
    }
    .container{
        width: 550px;
    }
    .box{
        display: flex;
        justify-content: center;
    }
    .code{
        padding: 10px;
        background-color: gainsboro;
        border-radius: 15px;
        width: 75px;
        text-align: center;
        cursor: pointer;
    }
    .code span{
        font-size: 24px
    }
</style>
<div class="container">
    <h1>Email verification</h1>
    <p>Hi {{$name}},</p>
    <p>You're almost set to start enjoying Nalouti Store. Simply copy the code below to verify your email address and get started.
    The code expires in 25 Minutes.</p>
    <div class="box">
        <div class="code">
            <span>{{$code}}</span>
        </div>
    </div>
</div>
