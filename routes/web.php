<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\MailController;

Route::get('/send-email', [MailController::class, 'sendEmail']);

Route::get('/{any}', fn () => view('app'))->where('any', '.*');
