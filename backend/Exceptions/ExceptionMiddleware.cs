using System.Net;
using System.Text.Json;

namespace backend.Exceptions;

public class ExceptionMiddleware
{
    private readonly RequestDelegate _next;

    public ExceptionMiddleware(RequestDelegate next)
    {
        _next = next;
    }

    public async Task InvokeAsync(HttpContext context)
    {
        try
        {
            await _next(context);
        }
        catch (NotFoundException ex)
        {
            await EscreverResposta(context, HttpStatusCode.NotFound, ex.Message);
        }
        catch (UnauthorizedException ex)
        {
            await EscreverResposta(context, HttpStatusCode.Unauthorized, ex.Message);
        }
        catch (BusinessException ex)
        {
            await EscreverResposta(context, HttpStatusCode.BadRequest, ex.Message);
        }
        catch (Exception)
        {
            await EscreverResposta(context, HttpStatusCode.InternalServerError, "Erro interno do servidor");
        }
    }

    private async Task EscreverResposta(HttpContext context, HttpStatusCode status, string mensagem)
    {
        context.Response.ContentType = "application/json";
        context.Response.StatusCode = (int)status;

        var resposta = new { erro = mensagem };
        await context.Response.WriteAsync(JsonSerializer.Serialize(resposta));
    }
}