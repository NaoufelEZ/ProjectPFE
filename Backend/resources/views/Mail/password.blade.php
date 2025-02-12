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
    <h1>Password Reset</h1>
    <p>Hi {{$name}},</p>
    <p>Your security code is</p>
    <div class="box">
        <div class="code">
            <span>{{$code}}</span>
        </div>
    </div>
    <p>To help us confirm your identity on account, we need to verify your email address. Paste this one-time code into your browser.</p>
</div>
